// app/customers/[id]/page.tsx

import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function CustomerDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const customer = await prisma.customer.findUnique({
    where: { id: params.id },
    include: {
      sales: {
        include: {
          items: {
            include: {
              finishedGood: {
                select: { id: true, name: true },
              },
            },
          },
        },
        orderBy: { saleDate: "desc" },
      },
    },
  });

  if (!customer) {
    return (
      <div className="text-center py-12">
        <p className="text-text-muted">Customer not found.</p>
        <Link href="/customers" className="text-text-brand hover:underline text-sm mt-2 inline-block">
          ← Back to Customers
        </Link>
      </div>
    );
  }

  const totalSpent = customer.sales.reduce(
    (sum, sale) => sum + sale.totalAmount,
    0
  );
  const totalOrders = customer.sales.length;
  const avgOrderValue = totalOrders > 0 ? totalSpent / totalOrders : 0;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">{customer.name}</h1>
          <p className="text-text-muted text-sm">
            Customer since {new Date(customer.createdAt).toLocaleDateString()}
          </p>
        </div>
        <Link href="/customers" className="text-text-muted hover:text-text text-sm">
          ← Back to Customers
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-surface-widget border border-default rounded-xl p-5">
          <p className="text-text-muted text-xs font-semibold uppercase tracking-wider">Total Orders</p>
          <p className="text-2xl font-bold mt-2 text-text">{totalOrders}</p>
        </div>
        <div className="bg-surface-widget border border-default rounded-xl p-5">
          <p className="text-text-muted text-xs font-semibold uppercase tracking-wider">Total Spent</p>
          <p className="text-2xl font-bold mt-2 text-text-brand">${totalSpent.toFixed(2)}</p>
        </div>
        <div className="bg-surface-widget border border-default rounded-xl p-5">
          <p className="text-text-muted text-xs font-semibold uppercase tracking-wider">Avg Order Value</p>
          <p className="text-2xl font-bold mt-2 text-warning">
            {totalOrders > 0 ? `$${avgOrderValue.toFixed(2)}` : "—"}
          </p>
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-surface-widget border border-default rounded-xl p-6">
        <h2 className="text-lg font-semibold text-text mb-4">Contact Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          {customer.email && (
            <div>
              <p className="text-text-muted text-xs uppercase font-medium">Email</p>
              <p className="text-text mt-1">{customer.email}</p>
            </div>
          )}
          {customer.phone && (
            <div>
              <p className="text-text-muted text-xs uppercase font-medium">Phone</p>
              <p className="text-text mt-1">{customer.phone}</p>
            </div>
          )}
          {customer.address && (
            <div className="sm:col-span-2">
              <p className="text-text-muted text-xs uppercase font-medium">Address</p>
              <p className="text-text mt-1">{customer.address}</p>
            </div>
          )}
          {customer.notes && (
            <div className="sm:col-span-2">
              <p className="text-text-muted text-xs uppercase font-medium">Notes</p>
              <p className="text-text mt-1">{customer.notes}</p>
            </div>
          )}
          {!customer.email && !customer.phone && !customer.address && !customer.notes && (
            <p className="text-text-muted text-sm">No contact information on file.</p>
          )}
        </div>
      </div>

      {/* Sales History */}
      <div className="bg-surface-widget border border-default rounded-xl overflow-hidden">
        <div className="p-5 border-b border-default">
          <h2 className="text-lg font-semibold text-text">Sales History</h2>
        </div>
        {customer.sales.length === 0 ? (
          <div className="text-center py-12 text-text-muted">
            No sales recorded for this customer yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-default bg-surface-widget text-text-muted text-xs uppercase tracking-wider">
                  <th className="p-4">Date</th>
                  <th className="p-4 text-center">Items</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-right">Total</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-default text-sm">
                {customer.sales.map((sale) => (
                  <tr key={sale.id} className="hover:bg-brand-muted dark:hover:bg-brand-muted-dark transition-colors">
                    <td className="p-4 text-text-secondary">
                      {new Date(sale.saleDate).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-center text-text-secondary">
                      {sale.items.reduce((sum, item) => sum + item.quantity, 0)} units
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
                    <td className="p-4 text-right font-medium text-text-brand">
                      ${sale.totalAmount.toFixed(2)}
                    </td>
                    <td className="p-4 text-center">
                      <Link
                        href={`/sales/${sale.id}`}
                        className="text-text-brand hover:underline text-xs font-medium"
                      >
                        View
                      </Link>
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