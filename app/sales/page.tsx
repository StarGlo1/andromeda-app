// app/sales/page.tsx

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { cookies } from "next/headers";

async function deleteSale(formData: FormData) {
  "use server";
  
  const cookieStore = cookies();
  if (cookieStore.get("demoMode")?.value === "true") {
    return;
  }

  const id = formData.get("id") as string;
  if (!id) return;

  const sale = await prisma.sale.findUnique({
    where: { id },
    include: { items: true },
  });

  if (sale) {
    for (const item of sale.items) {
      await prisma.finishedGood.update({
        where: { id: item.finishedGoodId },
        data: {
          quantityOnHand: { increment: item.quantity },
        },
      });
    }
  }

  await prisma.sale.delete({ where: { id } });
  revalidatePath("/sales");
  revalidatePath("/");
}

export default async function SalesPage() {
  const sales = await prisma.sale.findMany({
    include: {
      customer: true,
      items: {
        include: {
          finishedGood: true,
        },
      },
    },
    orderBy: { saleDate: "desc" },
  });

  const totalRevenue = sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
  const totalSales = sales.length;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold tracking-tight text-text mt-3">Sales</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-surface-widget border border-default rounded-xl p-5">
          <p className="text-text-muted text-xs font-semibold uppercase tracking-wider">Total Sales</p>
          <p className="text-3xl font-bold mt-2 text-text">{totalSales}</p>
        </div>
        <div className="bg-surface-widget border border-default rounded-xl p-5">
          <p className="text-text-muted text-xs font-semibold uppercase tracking-wider">Total Revenue</p>
          <p className="text-3xl font-bold mt-2 text-text-brand">${totalRevenue.toFixed(2)}</p>
        </div>
        <div className="bg-surface-widget border border-default rounded-xl p-5">
          <p className="text-text-muted text-xs font-semibold uppercase tracking-wider">Avg Order Value</p>
          <p className="text-3xl font-bold mt-2 text-warning">
            {totalSales > 0 ? `$${(totalRevenue / totalSales).toFixed(2)}` : "—"}
          </p>
        </div>
      </div>

      <div className="flex justify-end">
        <Link
          href="/sales/new"
          className="bg-[#4f8792] hover:bg-[#426f79] text-white font-medium px-6 py-2.5 rounded-full transition-colors text-sm flex items-center gap-2 shadow-md"
        >
          <span className="text-lg">+</span> New Sale
        </Link>
      </div>

      <div className="bg-surface-widget border border-default rounded-xl overflow-hidden">
        <div className="p-5 border-b border-default">
          <h2 className="text-lg font-semibold text-text">All Sales</h2>
        </div>
        {sales.length === 0 ? (
          <div className="text-center py-12 text-text-muted">
            No sales yet. Record your first sale to start tracking revenue!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-default bg-surface-widget text-text-muted text-xs uppercase tracking-wider">
                  <th className="p-4">Sale ID</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Items</th>
                  <th className="p-4 text-right">Total</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-default text-sm">
                {sales.map((sale) => (
                  <tr key={sale.id} className="hover:bg-brand-muted dark:hover:bg-brand-muted-dark transition-colors">
                    <td className="p-4 font-mono text-xs text-text-secondary">
                      #{sale.id.slice(0, 8)}
                    </td>
                    <td className="p-4 text-text-secondary">
                      {new Date(sale.saleDate).toLocaleDateString()}
                    </td>
                    <td className="p-4 font-medium text-text">
                      {sale.customer?.name || "Walk-in"}
                    </td>
                    <td className="p-4 text-text-secondary">
                      {sale.items.reduce((sum, item) => sum + item.quantity, 0)} units
                    </td>
                    <td className="p-4 font-medium text-text-brand text-right">
                      ${sale.totalAmount.toFixed(2)}
                    </td>
                    <td className="p-4 text-center">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          sale.status === "Paid"
                            ? "bg-success-muted dark:bg-success-muted-dark text-success"
                            : sale.status === "Shipped"
                            ? "bg-info-muted dark:bg-info-muted-dark text-info"
                            : sale.status === "Refunded"
                            ? "bg-error-muted dark:bg-error-muted-dark text-error"
                            : "bg-warning-muted dark:bg-warning-muted-dark text-warning"
                        }`}
                      >
                        {sale.status}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          href={`/sales/${sale.id}`}
                          className="text-text-brand hover:underline text-xs font-medium"
                        >
                          View
                        </Link>
                        <form action={deleteSale} className="inline">
                          <input type="hidden" name="id" value={sale.id} />
                          <button
                            type="submit"
                            className="text-error hover:underline text-xs font-medium"
                          >
                            Delete
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
