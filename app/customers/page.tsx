// app/customers/page.tsx

import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function CustomersPage() {
  const customers = await prisma.customer.findMany({
    include: {
      sales: {
        select: {
          id: true,
          totalAmount: true,
          saleDate: true,
          status: true,
        },
      },
    },
    orderBy: { name: "asc" },
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text mt-3">Customers</h1>
        <Link
          href="/customers/new"
          className="bg-[#4f8792] hover:bg-[#426f79] text-white font-medium px-4 py-2 rounded-full transition-colors text-sm flex items-center gap-2 shadow-md"
        >
          <span className="text-lg">+</span> New Customer
        </Link>
      </div>

      <div className="bg-surface-widget border border-default rounded-xl overflow-hidden">
        {customers.length === 0 ? (
          <div className="text-center py-12 text-text-muted">
            No customers yet. Add your first customer to start tracking sales.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-default bg-surface-widget text-text-muted text-xs uppercase tracking-wider">
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4 text-center">Orders</th>
                  <th className="p-4 text-right">Total Spent</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-default text-sm">
                {customers.map((customer) => {
                  const totalSpent = customer.sales.reduce(
                    (sum, sale) => sum + sale.totalAmount,
                    0
                  );
                  return (
                    <tr key={customer.id} className="hover:bg-brand-muted dark:hover:bg-brand-muted-dark transition-colors">
                      <td className="p-4 font-medium text-text">{customer.name}</td>
                      <td className="p-4 text-text-secondary">{customer.email || "—"}</td>
                      <td className="p-4 text-text-secondary">{customer.phone || "—"}</td>
                      <td className="p-4 text-center text-text-secondary">
                        {customer.sales.length}
                      </td>
                      <td className="p-4 text-right font-medium text-text-brand">
                        ${totalSpent.toFixed(2)}
                      </td>
                      <td className="p-4 text-center">
                        <Link
                          href={`/customers/${customer.id}`}
                          className="text-text-brand hover:underline text-xs font-medium"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}