// app/sales/[id]/page.tsx

import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { DeleteSaleButton } from "./DeleteSaleButton";

export default async function SaleDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const sale = await prisma.sale.findUnique({
    where: { id: params.id },
    include: {
      customer: true,
      items: {
        include: {
          finishedGood: {
            select: { id: true, name: true },
          },
        },
      },
    },
  });

  if (!sale) {
    return (
      <div className="text-center py-12">
        <p className="text-text-muted">Sale not found.</p>
        <Link href="/sales" className="text-text-brand hover:underline text-sm mt-2 inline-block">
          ← Back to Sales
        </Link>
      </div>
    );
  }

  const statusColors: Record<string, string> = {
    Draft: "bg-warning-muted dark:bg-warning-muted-dark text-warning",
    Paid: "bg-success-muted dark:bg-success-muted-dark text-success",
    Shipped: "bg-info-muted dark:bg-info-muted-dark text-info",
    Refunded: "bg-error-muted dark:bg-error-muted-dark text-error",
  };

  const subtotal = sale.items.reduce((sum, item) => sum + item.totalPrice, 0);
  const discountAmount = sale.discount > 0 ? (subtotal * sale.discount) / 100 : 0;
  const taxAmount = sale.tax > 0 ? ((subtotal - discountAmount) * sale.tax) / 100 : 0;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">
            Sale #{sale.id.slice(0, 8)}
          </h1>
          <p className="text-text-muted text-sm">
            {new Date(sale.saleDate).toLocaleString()}
          </p>
        </div>
        <Link href="/sales" className="text-text-muted hover:text-text text-sm">
          ← Back to Sales
        </Link>
      </div>

      {/* Status Badge */}
      <div className="flex items-center gap-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[sale.status] || "bg-default text-text-muted"}`}
        >
          {sale.status}
        </span>
        <span className="text-text-muted text-sm">
          Total: <span className="font-bold text-text-brand">${sale.totalAmount.toFixed(2)}</span>
        </span>
      </div>

      {/* Customer Info */}
      <div className="bg-surface-widget border border-default rounded-xl p-6">
        <h2 className="text-lg font-semibold text-text mb-2">Customer</h2>
        {sale.customer ? (
          <div>
            <p className="font-medium text-text">{sale.customer.name}</p>
            {sale.customer.email && (
              <p className="text-text-muted text-sm">{sale.customer.email}</p>
            )}
            {sale.customer.phone && (
              <p className="text-text-muted text-sm">{sale.customer.phone}</p>
            )}
            {sale.customer.address && (
              <p className="text-text-muted text-sm">{sale.customer.address}</p>
            )}
          </div>
        ) : (
          <p className="text-text-muted text-sm">Walk-in Customer</p>
        )}
        {sale.notes && (
          <div className="mt-4 pt-4 border-t border-default">
            <p className="text-text-muted text-xs font-medium uppercase mb-1">Notes</p>
            <p className="text-text text-sm">{sale.notes}</p>
          </div>
        )}
      </div>

      {/* Items */}
      <div className="bg-surface-widget border border-default rounded-xl overflow-hidden">
        <div className="p-5 border-b border-default">
          <h2 className="text-lg font-semibold text-text">Items</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-default bg-surface-widget text-text-muted text-xs uppercase tracking-wider">
                <th className="p-4">Product</th>
                <th className="p-4 text-center">Qty</th>
                <th className="p-4 text-right">Unit Price</th>
                <th className="p-4 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-default text-sm">
              {sale.items.map((item) => (
                <tr key={item.id}>
                  <td className="p-4 font-medium text-text">{item.finishedGood.name}</td>
                  <td className="p-4 text-center text-text-secondary">{item.quantity}</td>
                  <td className="p-4 text-right text-text-secondary">${item.unitPrice.toFixed(2)}</td>
                  <td className="p-4 text-right font-medium text-text-brand">
                    ${item.totalPrice.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="border-t-2 border-default">
              <tr>
                <td colSpan={3} className="p-4 text-right font-medium text-text">
                  Subtotal
                </td>
                <td className="p-4 text-right font-medium text-text">
                  ${subtotal.toFixed(2)}
                </td>
              </tr>
              {sale.discount > 0 && (
                <tr>
                  <td colSpan={3} className="p-4 text-right text-error">
                    Discount ({sale.discount}%)
                  </td>
                  <td className="p-4 text-right text-error">
                    -${discountAmount.toFixed(2)}
                  </td>
                </tr>
              )}
              {sale.tax > 0 && (
                <tr>
                  <td colSpan={3} className="p-4 text-right text-text-muted">
                    Tax ({sale.tax}%)
                  </td>
                  <td className="p-4 text-right text-text-muted">
                    ${taxAmount.toFixed(2)}
                  </td>
                </tr>
              )}
              <tr className="border-t border-default">
                <td colSpan={3} className="p-4 text-right font-bold text-text">
                  Total
                </td>
                <td className="p-4 text-right font-bold text-text-brand text-lg">
                  ${sale.totalAmount.toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <DeleteSaleButton saleId={sale.id} />
      </div>
    </div>
  );
}