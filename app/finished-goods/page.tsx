import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { SortableFinishedGoodsTable } from "@/app/components/SortableFinishedGoodsTable";
import Navbar from "@/app/components/Navbar";

async function addFinishedGood(formData: FormData) {
  "use server";
  const name = formData.get("name") as string;
  const sku = formData.get("sku") as string;
  const batchCode = formData.get("batchCode") as string;
  const retailPrice = parseFloat(formData.get("retailPrice") as string) || 0;
  const quantityOnHand = parseInt(formData.get("quantityOnHand") as string) || 0;
  const laborCostPerUnit = parseFloat(formData.get("laborCostPerUnit") as string) || 0;
  const overheadFlat = parseFloat(formData.get("overheadFlat") as string) || 0;
  const overheadPercent = parseFloat(formData.get("overheadPercent") as string) || 0;

  if (!name || !batchCode) return;

  await prisma.finishedGood.create({
    data: {
      name,
      sku: sku || null,
      batchCode,
      retailPrice,
      quantityOnHand,
      laborCostPerUnit,
      overheadFlat,
      overheadPercent,
      isCoreElement: false, // Core Element is set from recipe page
    },
  });
  revalidatePath("/finished-goods");
  revalidatePath("/finished-goods/core-elements");
}

async function updateFinishedGood(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const sku = formData.get("sku") as string;
  const batchCode = formData.get("batchCode") as string;
  const retailPrice = parseFloat(formData.get("retailPrice") as string) || 0;
  const quantityOnHand = parseInt(formData.get("quantityOnHand") as string) || 0;
  const laborCostPerUnit = parseFloat(formData.get("laborCostPerUnit") as string) || 0;
  const overheadFlat = parseFloat(formData.get("overheadFlat") as string) || 0;
  const overheadPercent = parseFloat(formData.get("overheadPercent") as string) || 0;

  if (!id || !name || !batchCode) return;

  await prisma.finishedGood.update({
    where: { id },
    data: {
      name,
      sku: sku || null,
      batchCode,
      retailPrice,
      quantityOnHand,
      laborCostPerUnit,
      overheadFlat,
      overheadPercent,
    },
  });
  revalidatePath("/finished-goods");
  revalidatePath("/finished-goods/core-elements");
}

async function deleteFinishedGood(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  if (!id) return;

  const usedAsCoreElement = await prisma.recipeItem.findFirst({
    where: { subAssemblyId: id },
  });

  if (usedAsCoreElement) {
    throw new Error("Cannot delete: this product is used as a Core Element in another recipe.");
  }

  await prisma.finishedGood.delete({ where: { id } });
  revalidatePath("/finished-goods");
  revalidatePath("/finished-goods/core-elements");
}

async function produceBatch(formData: FormData) {
  "use server";
  const finishedGoodId = formData.get("finishedGoodId") as string;
  const batchSize = parseInt(formData.get("batchSize") as string) || 0;
  if (!finishedGoodId || batchSize <= 0) return { success: false, error: "Invalid batch size." };

  try {
    await prisma.$transaction(async (tx) => {
      const recipeItems = await tx.recipeItem.findMany({
        where: { finishedGoodId },
        include: { rawMaterial: true, subAssembly: true },
      });

      if (recipeItems.length === 0) {
        throw new Error("No recipe found. Add ingredients first.");
      }

      const product = await tx.finishedGood.findUnique({ where: { id: finishedGoodId } });
      if (!product) throw new Error("Product not found.");

      let materialCost = 0;

      for (const item of recipeItems) {
        if (item.rawMaterialId) {
          const material = item.rawMaterial;
          if (!material) throw new Error(`Raw material not found for item ${item.id}`);
          const required = item.requiredQuantity * batchSize;
          const currentStock = material.totalQuantity ?? 0;
          if (currentStock < required) {
            throw new Error(`Not enough ${material.name}. Need ${required} ${item.unit}, only have ${currentStock}.`);
          }
          await tx.rawMaterial.update({
            where: { id: material.id },
            data: { totalQuantity: currentStock - required },
          });
          materialCost += required * (material.costPerUnit ?? 0);
        } else if (item.subAssemblyId) {
          const subAssembly = item.subAssembly;
          if (!subAssembly) throw new Error(`Core Element not found for item ${item.id}`);
          const required = item.requiredQuantity * batchSize;
          const currentStock = subAssembly.quantityOnHand;
          if (currentStock < required) {
            throw new Error(`Not enough "${subAssembly.name}". Need ${required} units, only have ${currentStock}.`);
          }
          await tx.finishedGood.update({
            where: { id: subAssembly.id },
            data: { quantityOnHand: currentStock - required },
          });
          materialCost += required * (subAssembly.calculatedCogs ?? 0);
        }
      }

      const laborCost = (product.laborCostPerUnit ?? 0) * batchSize;
      const overheadFlat = product.overheadFlat ?? 0;
      const overheadPercent = (product.overheadPercent ?? 0) / 100;
      const overheadVar = materialCost * overheadPercent;
      const totalBatchCost = materialCost + laborCost + overheadFlat + overheadVar;
      const newUnitCost = totalBatchCost / batchSize;

      const currentTotalUnits = product.quantityOnHand;
      const currentTotalCost = currentTotalUnits * (product.calculatedCogs ?? 0);
      const newTotalUnits = currentTotalUnits + batchSize;
      const newAvgCost = (currentTotalCost + totalBatchCost) / newTotalUnits;

      await tx.finishedGood.update({
        where: { id: finishedGoodId },
        data: { quantityOnHand: newTotalUnits, calculatedCogs: newAvgCost },
      });
    });

    revalidatePath("/finished-goods");
    revalidatePath("/finished-goods/core-elements");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export default async function FinishedGoodsPage() {
  const goods = await prisma.finishedGood.findMany({
    where: { isCoreElement: false },
    orderBy: { createdAt: "desc" },
  });

  const coreElements = await prisma.finishedGood.findMany({
    where: { isCoreElement: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-bg text-text p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <Navbar />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-surface-widget border border-default rounded-xl p-5">
            <p className="text-text-muted text-xs font-semibold uppercase tracking-wider">Total Products</p>
            <p className="text-3xl font-bold mt-2 text-text">{goods.length}</p>
          </div>
          <div className="bg-surface-widget border border-default rounded-xl p-5">
            <p className="text-text-muted text-xs font-semibold uppercase tracking-wider">Core Elements</p>
            <p className="text-3xl font-bold mt-2 text-text-brand">{coreElements.length}</p>
          </div>
          <div className="bg-surface-widget border border-default rounded-xl p-5">
            <p className="text-text-muted text-xs font-semibold uppercase tracking-wider">Avg COGS</p>
            <p className="text-3xl font-bold mt-2 text-warning">
              {goods.length > 0
                ? `$${(goods.reduce((sum, g) => sum + g.calculatedCogs, 0) / goods.length).toFixed(2)}`
                : "—"}
            </p>
          </div>
        </div>

        {/* Add Product Form */}
        <div className="bg-surface-widget border border-default rounded-xl p-6">
          <h2 className="text-lg font-semibold text-text mb-4">Add New Product</h2>
          <form action={addFinishedGood} className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
            <div>
              <label className="block text-text-muted text-xs font-medium uppercase mb-1">Product Name</label>
              <input type="text" name="name" required placeholder="e.g. 8oz Spiced Vanilla Candle" className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm" />
            </div>
            <div>
              <label className="block text-text-muted text-xs font-medium uppercase mb-1">SKU</label>
              <input type="text" name="sku" placeholder="e.g. CAN-SV-8" className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm" />
            </div>
            <div>
              <label className="block text-text-muted text-xs font-medium uppercase mb-1">Batch Code</label>
              <input type="text" name="batchCode" required placeholder="e.g. B001-2026" className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm" />
            </div>
            <div>
              <label className="block text-text-muted text-xs font-medium uppercase mb-1">Retail Price</label>
              <input type="number" step="any" name="retailPrice" placeholder="0.00" className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm" />
            </div>
            <div>
              <label className="block text-text-muted text-xs font-medium uppercase mb-1">Qty on Hand</label>
              <input type="number" name="quantityOnHand" placeholder="0" className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm" />
            </div>
            <div>
              <label className="block text-text-muted text-xs font-medium uppercase mb-1">Labor $/unit</label>
              <input type="number" step="any" name="laborCostPerUnit" placeholder="0.00" className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm" />
            </div>
            <div>
              <label className="block text-text-muted text-xs font-medium uppercase mb-1">Overhead Flat $</label>
              <input type="number" step="any" name="overheadFlat" placeholder="0.00" className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm" />
            </div>
            <div>
              <label className="block text-text-muted text-xs font-medium uppercase mb-1">Overhead %</label>
              <input type="number" step="any" name="overheadPercent" placeholder="0" className="w-full px-3 py-2 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm" />
            </div>
            <div>
              <button
                type="submit"
                className="w-fit px-6 mx-auto bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 rounded-full shadow-md transition-colors text-sm h-[40px]"
              >
                + Add Product
              </button>
            </div>
          </form>
          <p className="text-text-muted text-xs mt-3">
            You can mark this product as a Core Element later from its recipe page.
          </p>
        </div>

        {/* Products Table */}
        <div className="bg-surface-widget border border-default rounded-xl overflow-hidden">
          <div className="p-5 border-b border-default">
            <h2 className="text-lg font-semibold text-text text-center">Products</h2>
          </div>
          {goods.length === 0 ? (
            <div className="text-center py-12 text-text-muted">No products yet. Add your first product above!</div>
          ) : (
            <SortableFinishedGoodsTable
              goods={goods}
              updateAction={updateFinishedGood}
              deleteAction={deleteFinishedGood}
              produceAction={produceBatch}
            />
          )}
        </div>

        {/* Core Elements Section */}
        {coreElements.length > 0 && (
          <div className="bg-surface-widget border border-default rounded-xl overflow-hidden border-text-brand">
            <div className="p-5 border-b border-text-brand bg-brand-muted dark:bg-brand-muted-dark">
              <h2 className="text-lg font-semibold text-text-brand text-center">Core Elements</h2>
              <p className="text-text-muted text-xs text-center mt-1">Intermediate products used in other recipes</p>
            </div>
            <SortableFinishedGoodsTable
              goods={coreElements}
              updateAction={updateFinishedGood}
              deleteAction={deleteFinishedGood}
              produceAction={produceBatch}
            />
          </div>
        )}

        <div className="flex justify-end">
          <a
            href="/recipes"
            className="inline-flex items-center gap-2 bg-brand hover:bg-brand-hover text-white font-medium px-4 py-2 rounded-lg transition-colors text-sm"
          >
            🧪 Recipes
          </a>
        </div>
      </div>
    </main>
  );
}