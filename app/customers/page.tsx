"use client";

import { useState, useTransition } from "react";
import { useToast } from "@/app/context/ToastContext";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";

interface Customer {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  sales: { totalAmount: number }[];
}

export default function CustomersPage({ customers }: { customers: Customer[] }) {
  const { showToast } = useToast();
  const [isDeleting, startDeleteTransition] = useTransition();

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this customer?")) return;
    startDeleteTransition(async () => {
      try {
        const res = await fetch(`/api/customers/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Failed to delete");
        showToast("Customer deleted successfully!", "success");
        // Refresh the page
        window.location.reload();
      } catch (error: any) {
        showToast(error.message || "Failed to delete customer.", "error");
      }
    });
  };

  return (
    <main className="min-h-screen bg-bg text-text p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <Navbar />

        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-text">Customers</h1>
          <Link
            href="/customers/new"
            className="bg-brand hover:bg-brand-hover text-white font-medium px-4 py-2 rounded-lg transition-colors text-sm flex items-center gap-2"
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
                          <div className="flex items-center justify-center gap-2">
                            <Link
                              href={`/customers/${customer.id}`}
                              className="text-text-brand hover:underline text-xs font-medium"
                            >
                              View
                            </Link>
                            <button
                              onClick={() => handleDelete(customer.id)}
                              disabled={isDeleting}
                              className="text-error hover:underline text-xs font-medium disabled:opacity-50"
                            >
                              Delete
                            </button>
                          </div>
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
    </main>
  );
}