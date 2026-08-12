import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import UnitConverterToggle from "../components/UnitConverterToggle";
import { SortableRawMaterialsTable } from "../components/SortableRawMaterialsTable";
import { AddMaterialForm } from "../components/AddMaterialForm";
import Navbar from "../components/Navbar";

async function addCategory(formData: FormData) {
  "use server"; const name = formData.get("name") as string; if (!name) return;
  await prisma.category.create({ data: { name } }); revalidatePath("/materials");
}
async function addSupplier(formData: FormData) {
  "use server"; const name = formData.get("name") as string; if (!name) return;
  await prisma.supplier.create({ data: { name } }); revalidatePath("/materials");
}
async function addRawMaterial(formData: FormData) {
  "use server"; const name = formData.get("name") as string; const categoryId = formData.get("categoryId") as string; const supplierId = formData.get("supplierId") as string;
  const quantity = parseFloat(formData.get("quantity") as string) || 1; const sizePerUnit = parseFloat(formData.get("sizePerUnit") as string) || 0; const unit = formData.get("unit") as string;
  const purchaseTotal = parseFloat(formData.get("purchaseTotal") as string) || 0; const reorderThreshold = parseFloat(formData.get("reorderThreshold") as string) || null;
  const committedQuantity = parseFloat(formData.get("committedQuantity") as string) || 0; const onOrderQuantity = parseFloat(formData.get("onOrderQuantity") as string) || 0;
  if (!name || !categoryId || !unit) return;
  const totalQuantity = quantity * sizePerUnit; let costPerUnit = 0; if (totalQuantity > 0 && purchaseTotal > 0) costPerUnit = purchaseTotal / totalQuantity;
  await prisma.rawMaterial.create({ data: { name, categoryId, supplierId: supplierId || null, totalQuantity, unit, costPerUnit, reorderThreshold, committedQuantity, onOrderQuantity } });
  revalidatePath("/materials");
}
async function updateRawMaterial(formData: FormData) {
  "use server"; const id = formData.get("id") as string; const name = formData.get("name") as string; const categoryId = formData.get("categoryId") as string; const supplierId = formData.get("supplierId") as string;
  const totalQuantity = parseFloat(formData.get("totalQuantity") as string) || 0; const unit = formData.get("unit") as string; const costPerUnit = parseFloat(formData.get("costPerUnit") as string) || 0;
  const reorderThreshold = parseFloat(formData.get("reorderThreshold") as string) || null;
  const committedQuantity = parseFloat(formData.get("committedQuantity") as string) || 0; const onOrderQuantity = parseFloat(formData.get("onOrderQuantity") as string) || 0;
  if (!id || !name || !categoryId || !unit) return;
  await prisma.rawMaterial.update({ where: { id }, data: { name, categoryId, supplierId: supplierId || null, totalQuantity, unit, costPerUnit, reorderThreshold, committedQuantity, onOrderQuantity } });
  revalidatePath("/materials");
}
async function deleteRawMaterial(formData: FormData) {
  "use server"; const id = formData.get("id") as string; if (!id) return;
  await prisma.rawMaterial.delete({ where: { id } }); revalidatePath("/materials");
}

export default async function MaterialsPage() {
  const materials = await prisma.rawMaterial.findMany({ include: { category: true, supplier: true }, orderBy: { createdAt: "desc" } });
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });
  const suppliers = await prisma.supplier.findMany({ orderBy: { name: "asc" } });
  const lowStock = materials.filter(m => m.reorderThreshold !== null && (m.totalQuantity ?? 0) <= m.reorderThreshold!).length;

  return (
    <main className="min-h-screen bg-bg text-text p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <Navbar />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-surface-widget border border-default rounded-xl p-5"><p className="text-text-muted text-xs font-semibold uppercase tracking-wider">Total Raw Materials</p><p className="text-3xl font-bold mt-2 text-text">{materials.length}</p></div>
          <div className="bg-surface-widget border border-default rounded-xl p-5"><p className="text-text-muted text-xs font-semibold uppercase tracking-wider">Low Stock Alerts</p><p className={`text-3xl font-bold mt-2 ${lowStock > 0 ? 'text-warning' : 'text-text'}`}>{lowStock}</p></div>
          <div className="bg-surface-widget border border-default rounded-xl p-5"><p className="text-text-muted text-xs font-semibold uppercase tracking-wider">Categories</p><p className="text-3xl font-bold mt-2 text-text-brand">{categories.length}</p></div>
        </div>
        <UnitConverterToggle />
        <AddMaterialForm categories={categories} suppliers={suppliers} addRawMaterialAction={addRawMaterial} addCategoryAction={addCategory} addSupplierAction={addSupplier} />
        <div className="bg-surface-widget border border-default rounded-xl overflow-hidden">
          <div className="p-5 border-b border-default"><h2 className="text-lg font-semibold text-text">Raw Materials Inventory</h2></div>
          {materials.length === 0 ? <div className="text-center py-12 text-text-muted">No raw materials found. Add your first item above!</div> : (
            <SortableRawMaterialsTable materials={materials} categories={categories} suppliers={suppliers} updateAction={updateRawMaterial} deleteAction={deleteRawMaterial} addCategoryAction={addCategory} addSupplierAction={addSupplier} />
          )}
        </div>
        <div className="flex justify-end"><a href="/recipes" className="inline-flex items-center gap-2 bg-brand hover:bg-brand-hover text-white font-medium px-4 py-2 rounded-lg transition-colors text-sm">🧪 Recipes</a></div>
      </div>
    </main>
  );
}