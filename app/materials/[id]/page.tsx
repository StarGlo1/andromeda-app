import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import { PhotoUploader } from "@/app/components/PhotoUploader";
import RawMaterialLotForm from "@/app/components/RawMaterialLotForm";
import fs from "fs";
import path from "path";

// ─── Server Actions ───
async function updateMaterial(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const quantity = parseFloat(formData.get("quantity") as string) || 0;
  const sizePerUnit = parseFloat(formData.get("sizePerUnit") as string) || 0;
  const unit = formData.get("unit") as string;
  const barcode = String(formData.get("barcode") || "").trim() || null;
  const purchaseTotal = parseFloat(formData.get("purchaseTotal") as string) || 0;
  const reorderThreshold = parseFloat(formData.get("reorderThreshold") as string) || null;
  const committedQuantity = parseFloat(formData.get("committedQuantity") as string) || 0;
  const onOrderQuantity = parseFloat(formData.get("onOrderQuantity") as string) || 0;

  if (!id || !name || !unit) return;

  const totalQuantity = quantity * sizePerUnit;
  const costPerUnit = totalQuantity > 0 ? purchaseTotal / totalQuantity : 0;

  await prisma.rawMaterial.update({
    where: { id },
    data: {
      name,
      barcode,
      quantity,
      sizePerUnit,
      totalQuantity,
      unit,
      costPerUnit,
      reorderThreshold,
      committedQuantity,
      onOrderQuantity,
    },
  });

  revalidatePath(`/materials/${id}`);
}

async function uploadPhoto(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const file = formData.get("photo") as File | null;
  if (!id || !file || file.size === 0) return;

  const uploadDir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  const ext = file.name.split(".").pop() || "jpg";
  const filename = `material-${id}-${Date.now()}.${ext}`;
  const filePath = path.join(uploadDir, filename);
  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(filePath, buffer);

  await prisma.rawMaterial.update({
    where: { id },
    data: { imagePath: `/uploads/${filename}` },
  });
  revalidatePath(`/materials/${id}`);
}

async function removePhoto(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  if (!id) return;

  const material = await prisma.rawMaterial.findUnique({ where: { id } });
  if (!material?.imagePath) return;

  const filePath = path.join(process.cwd(), "public", material.imagePath);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

  await prisma.rawMaterial.update({
    where: { id },
    data: { imagePath: null },
  });
  revalidatePath(`/materials/${id}`);
}

// ─── Page Component ───
export default async function MaterialDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const material = await prisma.rawMaterial.findUnique({
    where: { id },
    include: {
      category: true,
      supplier: true,
      recipeItems: { include: { finishedGood: { select: { id: true, name: true } } } },
    },
  });

  if (!material) notFound();

  const availableStock =
    (material.totalQuantity ?? 0) -
    (material.committedQuantity ?? 0) +
    (material.onOrderQuantity ?? 0);
  const linkedProducts = material.recipeItems.map((ri) => ri.finishedGood);

  return (
    <main className="min-h-screen bg-bg text-text p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <Navbar />
        <a href="/materials" className="text-text-brand hover:underline text-sm">
          ← Back to Materials
        </a>
        <h1 className="text-2xl font-bold text-text">{material.name}</h1>
        <p className="text-text-muted">{material.category.name}</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div className="bg-surface-widget border border-default rounded-xl p-6">
              <h2 className="text-lg font-semibold text-text mb-4">Photo</h2>
              <PhotoUploader
                currentImagePath={material.imagePath}
                materialId={material.id}
                uploadAction={uploadPhoto}
                removeAction={removePhoto}
              />
            </div>

            <div className="bg-surface-widget border border-default rounded-xl p-6">
              <h2 className="text-lg font-semibold text-text mb-4">Raw Material Lots</h2>
              <RawMaterialLotForm rawMaterialId={material.id} />
            </div>

            <div className="bg-surface-widget border border-default rounded-xl p-6">
              <h2 className="text-lg font-semibold text-text mb-4">Inventory</h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-text-muted">Available Stock</p>
                  <p className="text-text font-bold text-lg">
                    {availableStock} {material.unit}
                  </p>
                </div>
                <div>
                  <p className="text-text-muted">On Hand</p>
                  <p className="text-text">
                    {material.totalQuantity ?? 0} {material.unit}
                  </p>
                </div>
                <div>
                  <p className="text-text-muted">Committed</p>
                  <p className="text-text">
                    {material.committedQuantity ?? 0} {material.unit}
                  </p>
                </div>
                <div>
                  <p className="text-text-muted">On Order</p>
                  <p className="text-text">
                    {material.onOrderQuantity ?? 0} {material.unit}
                  </p>
                </div>
                <div>
                  <p className="text-text-muted">Unit Cost</p>
                  <p className="text-text">
                    ${material.costPerUnit?.toFixed(2)} / {material.unit}
                  </p>
                </div>
                <div>
                  <p className="text-text-muted">Min Level</p>
                  <p className="text-text">
                    {material.reorderThreshold ?? "—"} {material.unit}
                  </p>
                </div>
                <div>
                  <p className="text-text-muted">Quantity</p>
                  <p className="text-text">
                    {material.quantity ?? 0}
                  </p>
                </div>
                <div>
                  <p className="text-text-muted">Size per Unit</p>
                  <p className="text-text">
                    {material.sizePerUnit ?? 0} {material.unit}
                  </p>
                </div>
              </div>
              {material.supplier && (
                <div className="mt-4 pt-4 border-t border-default">
                  <p className="text-text-muted">Supplier</p>
                  <p className="text-text">{material.supplier.name}</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-surface-widget border border-default rounded-xl p-6">
              <h2 className="text-lg font-semibold text-text mb-4">Quick Edit</h2>
              <form action={updateMaterial} className="space-y-4">
                <input type="hidden" name="id" value={material.id} />

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-text-muted text-xs font-medium uppercase mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      defaultValue={material.name}
                      required
                      className="w-full px-2 py-1.5 bg-bg border border-default rounded text-text text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-text-muted text-xs font-medium uppercase mb-1">
                      Unit
                    </label>
                    <input
                      type="text"
                      name="unit"
                      defaultValue={material.unit ?? ""}
                      required
                      className="w-full px-2 py-1.5 bg-bg border border-default rounded text-text text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-text-muted text-xs font-medium uppercase mb-1">
                    Barcode
                  </label>
                  <input
                    type="text"
                    name="barcode"
                    defaultValue={material.barcode ?? ""}
                    placeholder="Scan or type barcode"
                    className="w-full px-2 py-1.5 bg-bg border border-default rounded text-text text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-text-muted text-xs font-medium uppercase mb-1">
                      Quantity
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      defaultValue={material.quantity ?? 0}
                      step="any"
                      className="w-full px-2 py-1.5 bg-bg border border-default rounded text-text text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-text-muted text-xs font-medium uppercase mb-1">
                      Size per Unit
                    </label>
                    <input
                      type="number"
                      name="sizePerUnit"
                      defaultValue={material.sizePerUnit ?? 0}
                      step="any"
                      className="w-full px-2 py-1.5 bg-bg border border-default rounded text-text text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-text-muted text-xs font-medium uppercase mb-1">
                      Total Cost ($)
                    </label>
                    <input
                      type="number"
                      name="purchaseTotal"
                      defaultValue={
                        material.totalQuantity && material.costPerUnit
                          ? (material.totalQuantity * material.costPerUnit).toFixed(2)
                          : ""
                      }
                      step="any"
                      className="w-full px-2 py-1.5 bg-bg border border-default rounded text-text text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-text-muted text-xs font-medium uppercase mb-1">
                      Reorder
                    </label>
                    <input
                      type="number"
                      name="reorderThreshold"
                      defaultValue={material.reorderThreshold ?? ""}
                      step="any"
                      className="w-full px-2 py-1.5 bg-bg border border-default rounded text-text text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-text-muted text-xs font-medium uppercase mb-1">
                      Committed
                    </label>
                    <input
                      type="number"
                      name="committedQuantity"
                      defaultValue={material.committedQuantity ?? 0}
                      step="any"
                      className="w-full px-2 py-1.5 bg-bg border border-default rounded text-text text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-text-muted text-xs font-medium uppercase mb-1">
                      On Order
                    </label>
                    <input
                      type="number"
                      name="onOrderQuantity"
                      defaultValue={material.onOrderQuantity ?? 0}
                      step="any"
                      className="w-full px-2 py-1.5 bg-bg border border-default rounded text-text text-sm"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#4f8792] hover:bg-[#426f79] text-white text-sm font-medium px-4 py-2 rounded-full transition-colors"
                >
                  Save Changes
                </button>
              </form>
            </div>

            <div className="bg-surface-widget border border-default rounded-xl p-6">
              <h2 className="text-lg font-semibold text-text mb-4">Used In</h2>
              {linkedProducts.length === 0 ? (
                <p className="text-text-muted text-sm">Not used in any recipes yet.</p>
              ) : (
                <ul className="space-y-2">
                  {linkedProducts.map((product) => (
                    <li key={product.id}>
                      <a
                        href={`/finished-goods/${product.id}/recipe`}
                        className="text-text-brand hover:underline text-sm"
                      >
                        {product.name}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}