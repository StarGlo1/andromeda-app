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

  // Inventory value calculation (simplified)
  const inventoryValue =
    totalInventoryValue._sum.totalQuantity && totalInventoryValue._sum.costPerUnit
      ? totalInventoryValue._sum.totalQuantity * totalInventoryValue._sum.costPerUnit
      : 0;

  // Profit margin %
  const revenue = totalRevenue._sum.totalAmount ?? 0;
  const cogs = totalCogs._sum.totalPrice ?? 0;
  const profitMargin = revenue > 0 ? ((revenue - cogs) / revenue) * 100 : 0;

  // Reorder suggestions (low stock with suggested order qty)
  const reorderSuggestions = lowStockMaterials.map((m) => ({
    id: m.id,
    name: m.name,
    currentStock: m.totalQuantity ?? 0,
    reorderThreshold: m.reorderThreshold ?? 0,
    suggestedOrder: Math.max((m.reorderThreshold ?? 0) * 2 - (m.totalQuantity ?? 0), 0),
    unit: m.unit ?? "",
  }));

  // Expiring / oldest stock
  // If expirationDate doesn't exist, use updatedAt as proxy (oldest updated = oldest)
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

  // Top selling products (with product names)
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