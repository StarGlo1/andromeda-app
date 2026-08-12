import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import Navbar from "@/app/components/Navbar";
import { SupplierTable } from "./SupplierTable";

// ─── Server Actions ───
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

async function updateSupplier(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const contact = formData.get("contact") as string;
  const website = formData.get("website") as string;
  const notes = formData.get("notes") as string;

  if (!id || !name) return;

  await prisma.supplier.update({
    where: { id },
    data: {
      name,
      contact: contact || null,
      website: website || null,
      notes: notes || null,
    },
  });
  revalidatePath("/suppliers");
}

async function deleteSupplier(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  if (!id) return;

  await prisma.supplier.delete({ where: { id } });
  revalidatePath("/suppliers");
}

// ─── Page Component ───
export default async function SuppliersPage() {
  const suppliers = await prisma.supplier.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <main className="min-h-screen bg-bg text-text p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <Navbar />

        {/* Add Supplier Form */}
        <div className="bg-surface-widget border border-default rounded-xl p-6">
          <h2 className="text-lg font-semibold text-text mb-4">Add New Supplier</h2>
          <form action={addSupplier} className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
            <div>
              <label className="block text-text-muted text-xs font-medium uppercase mb-1">Name *</label>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. Lone Star Candle Supply"
                className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm"
              />
            </div>
            <div>
              <label className="block text-text-muted text-xs font-medium uppercase mb-1">Contact</label>
              <input
                type="text"
                name="contact"
                placeholder="Email or phone"
                className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm"
              />
            </div>
            <div>
              <label className="block text-text-muted text-xs font-medium uppercase mb-1">Website</label>
              <input
                type="url"
                name="website"
                placeholder="https://..."
                className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-brand hover:bg-brand-hover text-white font-medium px-4 py-2 rounded-lg transition-colors text-sm h-[40px]"
              >
                + Add Supplier
              </button>
            </div>
          </form>
        </div>

        {/* Supplier Table */}
        <div className="bg-surface-widget border border-default rounded-xl overflow-hidden">
          <div className="p-5 border-b border-default">
            <h2 className="text-lg font-semibold text-text">Suppliers</h2>
          </div>
          {suppliers.length === 0 ? (
            <div className="text-center py-12 text-text-muted">
              No suppliers yet. Add your first one above!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <SupplierTable
                suppliers={suppliers}
                updateAction={updateSupplier}
                deleteAction={deleteSupplier}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}