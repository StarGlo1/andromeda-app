import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  let materialCount = 0;
  let productCount = 0;
  let customerCount = 0;
  let saleCount = 0;

  try {
    materialCount = await prisma.rawMaterial.count();
    productCount = await prisma.finishedGood.count();
    customerCount = await prisma.customer.count();
    saleCount = await prisma.sale.count();
  } catch (error) {
    console.error("Database query error:", error);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex justify-between items-center border-b border-slate-800 pb-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Andromeda</h1>
            <p className="text-slate-400 text-sm mt-1">Inventory & Operations Dashboard</p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
            <h3 className="text-sm font-medium text-slate-400">Raw Materials</h3>
            <p className="text-4xl font-bold mt-2 text-indigo-400">{materialCount}</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
            <h3 className="text-sm font-medium text-slate-400">Finished Goods</h3>
            <p className="text-4xl font-bold mt-2 text-emerald-400">{productCount}</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
            <h3 className="text-sm font-medium text-slate-400">Customers</h3>
            <p className="text-4xl font-bold mt-2 text-sky-400">{customerCount}</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
            <h3 className="text-sm font-medium text-slate-400">Total Sales</h3>
            <p className="text-4xl font-bold mt-2 text-amber-400">{saleCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}