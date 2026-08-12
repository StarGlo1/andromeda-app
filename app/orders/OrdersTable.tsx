"use client";

import { useState, useTransition } from "react";
import { useToast } from "@/app/context/ToastContext";

interface OrderItem {
  id: string;
  quantity: number;
  unitCost: number;
  receivedQty: number;
  material: { id: string; name: string; unit: string | null };
}

interface PurchaseOrder {
  id: string;
  supplier: { id: string; name: string };
  orderDate: string;
  expectedDate: string | null;
  status: string;
  notes: string | null;
  items: OrderItem[];
}

export function OrdersTable({
  orders,
  receiveAction,
  deleteAction,
}: {
  orders: PurchaseOrder[];
  receiveAction: (formData: FormData) => Promise<void>;
  deleteAction: (formData: FormData) => Promise<void>;
}) {
  const { showToast } = useToast();
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [isReceiving, startReceiveTransition] = useTransition();
  const [isDeleting, startDeleteTransition] = useTransition();

  const handleReceive = (formData: FormData) => {
    startReceiveTransition(async () => {
      try {
        await receiveAction(formData);
        showToast("Items received successfully! Inventory updated.", "success");
      } catch (error: any) {
        showToast(error.message || "Failed to receive items.", "error");
      }
    });
  };

  const handleDelete = (formData: FormData) => {
    if (!confirm("Delete this order?")) return;
    startDeleteTransition(async () => {
      try {
        await deleteAction(formData);
        showToast("Order deleted successfully.", "success");
      } catch (error: any) {
        showToast(error.message || "Failed to delete order.", "error");
      }
    });
  };

  return (
    <div className="bg-surface-widget border border-default rounded-xl overflow-hidden">
      <div className="p-5 border-b border-default">
        <h2 className="text-lg font-semibold text-text">Purchase Orders</h2>
      </div>
      {orders.length === 0 ? (
        <div className="text-center py-12 text-text-muted">No orders yet.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-default bg-surface-widget text-text-muted text-xs uppercase tracking-wider">
                <th className="p-4">Supplier</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
                <th className="p-4">Expected</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-default text-sm">
              {orders.map((order) => (
                <>
                  <tr key={order.id} className="hover:bg-brand-muted dark:hover:bg-brand-muted-dark transition-colors">
                    <td className="p-4 font-medium text-text">{order.supplier.name}</td>
                    <td className={`p-4 ${order.status === "Received" ? "text-success" : order.status === "Pending" ? "text-warning" : "text-error"}`}>{order.status}</td>
                    <td className="p-4 text-text-secondary">{new Date(order.orderDate).toLocaleDateString()}</td>
                    <td className="p-4 text-text-secondary">{order.expectedDate ? new Date(order.expectedDate).toLocaleDateString() : "—"}</td>
                    <td className="p-4 flex gap-2">
                      <button onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)} className="text-text-brand hover:underline text-xs font-medium">
                        {expandedOrder === order.id ? "Hide" : "Items"} ({order.items.length})
                      </button>
                      <form action={handleDelete}>
                        <input type="hidden" name="id" value={order.id} />
                        <button type="submit" disabled={isDeleting} className="text-error hover:underline text-xs font-medium disabled:opacity-50">
                          {isDeleting ? "..." : "Delete"}
                        </button>
                      </form>
                    </td>
                  </tr>
                  {expandedOrder === order.id && (
                    <tr key={`items-${order.id}`} className="bg-brand-muted/20 dark:bg-brand-muted-dark/20">
                      <td colSpan={5} className="p-4">
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="text-text-muted text-xs uppercase tracking-wider border-b border-default">
                                <th className="p-2">Material</th>
                                <th className="p-2">Ordered</th>
                                <th className="p-2">Unit Cost</th>
                                <th className="p-2">Received</th>
                                <th className="p-2">Receive</th>
                              </tr>
                            </thead>
                            <tbody>
                              {order.items.map((item) => (
                                <tr key={item.id} className="text-text">
                                  <td className="p-2">{item.material.name} ({item.material.unit})</td>
                                  <td className="p-2">{item.quantity}</td>
                                  <td className="p-2">${item.unitCost.toFixed(2)}</td>
                                  <td className="p-2">{item.receivedQty} / {item.quantity}</td>
                                  <td className="p-2">
                                    {item.receivedQty < item.quantity && order.status !== "Received" && (
                                      <form action={handleReceive} className="flex items-center gap-1">
                                        <input type="hidden" name="itemId" value={item.id} />
                                        <input type="hidden" name="orderId" value={order.id} />
                                        <input type="number" name="receivedQty" min={1} max={item.quantity - item.receivedQty} defaultValue={item.quantity - item.receivedQty} className="w-20 px-2 py-1 bg-bg border border-default rounded text-text text-sm" />
                                        <button type="submit" disabled={isReceiving} className="bg-brand hover:bg-brand-hover text-white text-xs px-2 py-1 rounded disabled:opacity-50">
                                          {isReceiving ? "..." : "Receive"}
                                        </button>
                                      </form>
                                    )}
                                    {item.receivedQty >= item.quantity && <span className="text-success text-xs">Fully received</span>}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}