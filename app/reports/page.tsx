import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import Navbar from "@/app/components/Navbar";
import ReportsClient from "./ReportsClient";

interface ReportData {
  totalRevenue: number;
  totalCogs: number;
  grossProfit: number;
  grossMargin: number;
  inventoryValue: number;
  materialValue: number;
  subAssemblyValue: number;
  finishedGoodValue: number;
  productProfitability: {
    name: string;
    revenue: number;
    cogs: number;
    profit: number;
    margin: number;
  }[];
}

async function getReportData(startDate?: Date, endDate?: Date): Promise<ReportData> {
  const salesWhere = {};
  if (startDate) salesWhere["saleDate"] = { gte: startDate };
  if (endDate) salesWhere["saleDate"] = { ...salesWhere["saleDate"], lte: endDate };
  const sales = await prisma.sale.findMany({
    where: salesWhere,
    include: { items: { include: { finishedGood: true } } },
  });

  const totalRevenue = sales.reduce((sum, s) => sum + s.totalAmount, 0);
  const totalCogs = sales.reduce((sum, s) => {
    const saleCogs = s.items.reduce((itemSum, item) => {
      return itemSum + (item.finishedGood.calculatedCogs ?? 0) * item.quantity;
    }, 0);
    return sum + saleCogs;
  }, 0);
  const grossProfit = totalRevenue - totalCogs;
  const grossMargin = totalRevenue > 0 ? (grossProfit / totalRevenue) * 100 : 0;

  const materials = await prisma.rawMaterial.findMany();
  const materialValue = materials.reduce((sum, m) => sum + (m.totalQuantity ?? 0) * (m.costPerUnit ?? 0), 0);

  const subAssemblies = await prisma.finishedGood.findMany({
    where: { isSubAssembly: true },
  });
  const subAssemblyValue = subAssemblies.reduce((sum, g) => sum + g.quantityOnHand * (g.calculatedCogs ?? 0), 0);

  const finishedGoods = await prisma.finishedGood.findMany({
    where: { isSubAssembly: false },
  });
  const finishedGoodValue = finishedGoods.reduce((sum, g) => sum + g.quantityOnHand * (g.retailPrice ?? 0), 0);

  const inventoryValue = materialValue + subAssemblyValue + finishedGoodValue;

  const productProfitabilityMap: Record<string, { revenue: number; cogs: number; quantity: number }> = {};
  for (const sale of sales) {
    for (const item of sale.items) {
      const name = item.finishedGood.name;
      if (!productProfitabilityMap[name]) {
        productProfitabilityMap[name] = { revenue: 0, cogs: 0, quantity: 0 };
      }
      productProfitabilityMap[name].revenue += item.totalPrice;
      productProfitabilityMap[name].cogs += (item.finishedGood.calculatedCogs ?? 0) * item.quantity;
      productProfitabilityMap[name].quantity += item.quantity;
    }
  }
  const productProfitability = Object.entries(productProfitabilityMap).map(([name, data]) => {
    const profit = data.revenue - data.cogs;
    const margin = data.revenue > 0 ? (profit / data.revenue) * 100 : 0;
    return { name, revenue: data.revenue, cogs: data.cogs, profit, margin };
  }).sort((a, b) => b.profit - a.profit);

  return {
    totalRevenue,
    totalCogs,
    grossProfit,
    grossMargin,
    inventoryValue,
    materialValue,
    subAssemblyValue,
    finishedGoodValue,
    productProfitability,
  };
}

export default async function ReportsPage({
  searchParams,
}: {
  searchParams: Promise<{ start?: string; end?: string }>;
}) {
  const params = await searchParams;
  const startDate = params.start ? new Date(params.start) : undefined;
  const endDate = params.end ? new Date(params.end) : undefined;

  const data = await getReportData(startDate, endDate);

  const purchases = await prisma.purchaseOrderItem.aggregate({
    _sum: { unitCost: true, quantity: true },
  });
  const totalPurchases = (purchases._sum.unitCost ?? 0) * (purchases._sum.quantity ?? 0);
  const cogsScheduleC = data.inventoryValue + totalPurchases - data.inventoryValue;

  return (
    <main className="min-h-screen bg-bg text-text p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <Navbar />
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-text">Reports Dashboard</h1>
          <a
            href="/reports/cogs"
            className="bg-gray-200 text-black hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 text-sm font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            📋 Detailed COGS Calculator
          </a>
        </div>
        <ReportsClient
          data={data}
          cogsScheduleC={cogsScheduleC}
          startDate={startDate?.toISOString()}
          endDate={endDate?.toISOString()}
        />
      </div>
    </main>
  );
}