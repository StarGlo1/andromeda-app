import { prisma } from "@/lib/prisma";

export async function GET() {
  const [
    totalMaterials,
    totalProducts,
    totalRecipes,
    totalSales,
    totalRevenue,
    totalInventoryValue,
    lowStockMaterials,
    recentActivity,
    topSellingProducts,
    pendingSalesCount,
    totalCogs,
  ] = await Promise.all([
    prisma.rawMaterial.count(),
    prisma.finishedGood.count(),
    prisma.recipeItem.count(),
    prisma.sale.count(),
    prisma.sale.aggregate({ _sum: { totalAmount: true } }),
    prisma.rawMaterial.aggregate({
      _sum: { totalQuantity: true, costPerUnit: true },
    }),
    prisma.rawMaterial.findMany({
      where: {
        reorderThreshold: { not: null },
        totalQuantity: { lte: prisma.rawMaterial.fields.reorderThreshold },
      },
      include: { category: true },
      take: 10,
    }),
    prisma.sale.findMany({
      orderBy: { saleDate: "desc" },
      take: 5,
      include: { items: { include: { finishedGood: true } } },
    }),
    prisma.saleItem.groupBy({
      by: ["finishedGoodId"],
      _sum: { quantity: true, totalPrice: true },
      orderBy: { _sum: { quantity: "desc" } },
      take: 5,
    }),
    prisma.sale.count({
      where: { status: { notIn: ["Paid", "Refunded"] } },
    }),
    prisma.saleItem.aggregate({
      _sum: { totalPrice: true },
    }),
  ]);

  const inventoryValue =
    totalInventoryValue._sum.totalQuantity && totalInventoryValue._sum.costPerUnit
      ? totalInventoryValue._sum.totalQuantity * totalInventoryValue._sum.costPerUnit
      : 0;

  const revenue = totalRevenue._sum.totalAmount ?? 0;
  const cogs = totalCogs._sum.totalPrice ?? 0;
  const profitMargin = revenue > 0 ? ((revenue - cogs) / revenue) * 100 : 0;

  const reorderSuggestions = lowStockMaterials.map((m) => ({
    id: m.id,
    name: m.name,
    currentStock: m.totalQuantity ?? 0,
    reorderThreshold: m.reorderThreshold ?? 0,
    suggestedOrder: Math.max((m.reorderThreshold ?? 0) * 2 - (m.totalQuantity ?? 0), 0),
    unit: m.unit ?? "",
  }));

  const expiringStock = await prisma.rawMaterial.findMany({
    orderBy: { updatedAt: "asc" },
    take: 5,
    select: {
      id: true,
      name: true,
      totalQuantity: true,
      unit: true,
      updatedAt: true,
    },
  });

  // Top selling products with names
  const topSelling = [];
  for (const group of topSellingProducts) {
    const product = await prisma.finishedGood.findUnique({
      where: { id: group.finishedGoodId },
      select: { name: true },
    });
    if (product) {
      topSelling.push({
        name: product.name,
        quantity: group._sum.quantity ?? 0,
        revenue: group._sum.totalPrice ?? 0,
      });
    }
  }

  // Profit margin over time (monthly)
  const salesByMonth = await prisma.sale.findMany({
    select: {
      saleDate: true,
      totalAmount: true,
    },
    orderBy: { saleDate: "asc" },
  });

  const monthlyProfitMap: Record<string, { revenue: number; cogs: number }> = {};

  for (const sale of salesByMonth) {
    const month = sale.saleDate.toISOString().slice(0, 7); // YYYY-MM
    if (!monthlyProfitMap[month]) {
      monthlyProfitMap[month] = { revenue: 0, cogs: 0 };
    }
    monthlyProfitMap[month].revenue += sale.totalAmount;
  }

  // Estimate COGS per month: we'll use avg COGS from sale items
  const saleItemsWithCogs = await prisma.saleItem.findMany({
    include: { finishedGood: true },
  });

  // Map saleId -> total COGS
  const saleCogsMap: Record<string, number> = {};
  for (const item of saleItemsWithCogs) {
    const cogsForItem = item.finishedGood.calculatedCogs * item.quantity;
    if (!saleCogsMap[item.saleId]) saleCogsMap[item.saleId] = 0;
    saleCogsMap[item.saleId] += cogsForItem;
  }

  // Recalculate monthly COGS using map
  for (const sale of salesByMonth) {
    const month = sale.saleDate.toISOString().slice(0, 7);
    const saleCogs = saleCogsMap[sale.id] || 0;
    monthlyProfitMap[month].cogs += saleCogs;
  }

  const profitTrend = Object.entries(monthlyProfitMap).map(([month, data]) => {
    const margin = data.revenue > 0 ? ((data.revenue - data.cogs) / data.revenue) * 100 : 0;
    return {
      month,
      revenue: data.revenue,
      cogs: data.cogs,
      margin: parseFloat(margin.toFixed(1)),
    };
  });

  const alerts = await prisma.alert.findMany({
    where: { status: "active" },
    orderBy: { createdAt: "desc" },
  });

  return new Response(
    JSON.stringify({
      totalMaterials,
      totalProducts,
      totalRecipes,
      totalSales,
      totalRevenue: revenue,
      inventoryValue,
      lowStockCount: lowStockMaterials.length,
      lowStockMaterials: lowStockMaterials.map((m) => ({
        id: m.id,
        name: m.name,
        category: m.category.name,
        totalQuantity: m.totalQuantity,
        unit: m.unit,
        reorderThreshold: m.reorderThreshold,
      })),
      reorderSuggestions,
      topSelling,
      pendingSalesCount,
      profitMargin,
      expiringStock: expiringStock.map((m) => ({
        id: m.id,
        name: m.name,
        totalQuantity: m.totalQuantity,
        unit: m.unit,
        updatedAt: m.updatedAt,
      })),
      profitTrend,
      recentActivity: recentActivity.map((s) => ({
        id: s.id,
        type: "sale",
        name: s.items[0]?.finishedGood.name || "Sale",
        totalAmount: s.totalAmount,
        date: s.saleDate,
      })),
      alertsCount: alerts.length,
      alerts: alerts,
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}