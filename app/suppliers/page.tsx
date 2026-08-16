// app/suppliers/page.tsx

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

async function addSupplier(formData: FormData) {
  "use server";
  const name = formData.get("name") as string;
  const contact = formData.get("contact") as string;
  const website = formData.get("website") as string;
  const notes = formData.get("notes") as string;

  if (!name) return;

  await prisma.supplier.create({
    data: {
      name,
      contact: contact || null,
      website: website || null,
      notes: notes || null,
    },
  });
  revalidatePath("/suppliers");
}

export default async function SuppliersPage() {
  const suppliers = await prisma.supplier.findMany({
    include: {
      rawMaterials: true,
      purchaseOrders: true,
    },
    orderBy: { name: "asc" },
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text">Suppliers</h1>
      </div>

      <div className="bg-surface-widget border border-default rounded-xl p-6">
        <h2 className="text-lg font-semibold text-text mb-4">Add New Supplier</h2>
        <form action={addSupplier} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-text-muted text-xs font-medium uppercase mb-1">Supplier Name</label>
            <input type="text" name="name" required placeholder="e.g. CandleScience" className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm" />
          </div>
          <div>
            <label className="block text-text-muted text-xs font-medium uppercase mb-1">Contact</label>
            <input type="text" name="contact" placeholder="e.g. John Doe" className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm" />
          </div>
          <div>
            <label className="block text-text-muted text-xs font-medium uppercase mb-1">Website</label>
            <input type="text" name="website" placeholder="e.g. www.candlescience.com" className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm" />
          </div>
          <div>
            <label className="block text-text-muted text-xs font-medium uppercase mb-1">Notes</label>
            <input type="text" name="notes" placeholder="Any notes about this supplier" className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm" />
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-brand hover:bg-brand-hover text-white font-medium px-4 py-2 rounded-lg transition-colors text-sm h-[40px]"
            >
              + Add Supplier
            </button>
          </div>
        </form>
      </div>

      <div className="bg-surface-widget border border-default rounded-xl overflow-hidden">
        {suppliers.length === 0 ? (
          <div className="text-center py-12 text-text-muted">
            No suppliers yet. Add your first supplier above!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-default bg-surface-widget text-text-muted text-xs uppercase tracking-wider">
                  <th className="p-4">Name</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Website</th>
                  <th className="p-4 text-center">Materials</th>
                  <th className="p-4 text-center">Orders</th>
                  <th className="p-4">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-default text-sm">
                {suppliers.map((supplier) => (
                  <tr key={supplier.id} className="hover:bg-brand-muted dark:hover:bg-brand-muted-dark transition-colors">
                    <td className="p-4 font-medium text-text">{supplier.name}</td>
                    <td className="p-4 text-text-secondary">{supplier.contact || "—"}</td>
                    <td className="p-4 text-text-secondary">
                      {supplier.website ? (
                        <a href={`https://${supplier.website}`} target="_blank" rel="noopener noreferrer" className="text-text-brand hover:underline">
                          {supplier.website}
                        </a>
                      ) : "—"}
                    </td>
                    <td className="p-4 text-center text-text-secondary">{supplier.rawMaterials.length}</td>
                    <td className="p-4 text-center text-text-secondary">{supplier.purchaseOrders.length}</td>
                    <td className="p-4 text-text-secondary">{supplier.notes || "—"}</td>
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