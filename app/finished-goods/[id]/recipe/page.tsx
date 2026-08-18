import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";
import UnitConverter from "@/app/components/UnitConverter";
import { AddRecipeForm } from "./AddRecipeForm";
import { RecipeTableClient } from "./RecipeTableClient";
import { convertToPricingUnit } from "@/app/lib/units";
import { HelpTip } from "@/app/components/HelpTip";
import PourSheetButton from "./PourSheetButton";
import VersionHistory from "./VersionHistory";

// ─── Helper: snapshot current recipe before changes ───
async function snapshotRecipeVersion(finishedGoodId: string) {
  const recipeItems = await prisma.recipeItem.findMany({
    where: { finishedGoodId },
    include: {
      rawMaterial: { select: { id: true, name: true } },
      subAssembly: { select: { id: true, name: true } },
    },
  });

  const latestVersion = await prisma.recipeVersion.findFirst({
    where: { finishedGoodId },
    orderBy: { versionNumber: "desc" },
  });

  const nextVersion = (latestVersion?.versionNumber ?? 0) + 1;

  await prisma.recipeVersion.create({
    data: {
      finishedGoodId,
      versionNumber: nextVersion,
      recipeSnapshot: JSON.stringify(recipeItems),
    },
  });
}

// ─── Helper: recalculate COGS (recursive) ───
async function recalcCogs(finishedGoodId: string): Promise<number> {
  const recipeItems = await prisma.recipeItem.findMany({
    where: { finishedGoodId },
    include: {
      rawMaterial: true,
      subAssembly: true,
    },
  });

  let totalCogs = 0;

  for (const item of recipeItems) {
    if (item.rawMaterialId && item.rawMaterial) {
      const convertedQty = convertToPricingUnit(
        item.requiredQuantity,
        item.unit,
        item.rawMaterial.unit
      );
      totalCogs += convertedQty * (item.rawMaterial.costPerUnit ?? 0);
    } else if (item.subAssemblyId && item.subAssembly) {
      const subCogs = await recalcCogs(item.subAssemblyId);
      totalCogs += item.requiredQuantity * subCogs;
    }
  }

  return totalCogs;
}

// ─── Server Actions ───
async function addRecipeItem(formData: FormData) {
  "use server";
  const finishedGoodId = formData.get("finishedGoodId") as string;
  const rawMaterialId = formData.get("rawMaterialId") as string;
  const subAssemblyId = formData.get("subAssemblyId") as string;
  const requiredQuantity = parseFloat(formData.get("requiredQuantity") as string) || 0;
  const unit = formData.get("unit") as string;
  const ingredientType = formData.get("ingredientType") as string;

  if (!finishedGoodId || !unit) return;

  if (ingredientType === "raw" && !rawMaterialId) return;
  if (ingredientType === "core" && !subAssemblyId) return;

  await snapshotRecipeVersion(finishedGoodId);

  if (rawMaterialId) {
    const existing = await prisma.recipeItem.findFirst({
      where: { finishedGoodId, rawMaterialId },
    });
    if (existing) throw new Error("This raw material is already in the recipe.");
  }

  if (subAssemblyId) {
    const existing = await prisma.recipeItem.findFirst({
      where: { finishedGoodId, subAssemblyId },
    });
    if (existing) throw new Error("This Core Element is already in the recipe.");
  }

  await prisma.recipeItem.create({
    data: {
      finishedGoodId,
      rawMaterialId: ingredientType === "raw" ? rawMaterialId : null,
      subAssemblyId: ingredientType === "core" ? subAssemblyId : null,
      requiredQuantity,
      unit,
    },
  });

  const newCogs = await recalcCogs(finishedGoodId);
  await prisma.finishedGood.update({
    where: { id: finishedGoodId },
    data: { calculatedCogs: newCogs },
  });

  revalidatePath(`/finished-goods/${finishedGoodId}/recipe`);
}

async function updateRecipeItem(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const requiredQuantity = parseFloat(formData.get("requiredQuantity") as string) || 0;
  const unit = formData.get("unit") as string;
  const finishedGoodId = formData.get("finishedGoodId") as string;

  if (!id || !unit) return;

  await snapshotRecipeVersion(finishedGoodId);

  await prisma.recipeItem.update({
    where: { id },
    data: { requiredQuantity, unit },
  });

  if (finishedGoodId) {
    const newCogs = await recalcCogs(finishedGoodId);
    await prisma.finishedGood.update({
      where: { id: finishedGoodId },
      data: { calculatedCogs: newCogs },
    });
  }
  revalidatePath(`/finished-goods/${finishedGoodId}/recipe`);
}

async function deleteRecipeItem(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const finishedGoodId = formData.get("finishedGoodId") as string;

  if (!id) return;

  await snapshotRecipeVersion(finishedGoodId);

  await prisma.recipeItem.delete({ where: { id } });

  if (finishedGoodId) {
    const newCogs = await recalcCogs(finishedGoodId);
    await prisma.finishedGood.update({
      where: { id: finishedGoodId },
      data: { calculatedCogs: newCogs },
    });
  }
  revalidatePath(`/finished-goods/${finishedGoodId}/recipe`);
}

async function toggleCoreElement(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const isCoreElement = formData.get("isCoreElement") === "on";

  if (!id) return;

  await prisma.finishedGood.update({
    where: { id },
    data: { isCoreElement },
  });

  revalidatePath(`/finished-goods/${id}/recipe`);
  revalidatePath("/finished-goods");
  revalidatePath("/finished-goods/core-elements");
}

// ─── Page Component ───
export default async function RecipePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let finishedGood = await prisma.finishedGood.findUnique({
    where: { id },
    include: {
      recipeItems: {
        include: {
          rawMaterial: true,
          subAssembly: true,
        },
      },
    },
  });

  if (!finishedGood) notFound();

  if (finishedGood.recipeItems.length > 0) {
    const newCogs = await recalcCogs(finishedGood.id);
    if (newCogs !== finishedGood.calculatedCogs) {
      await prisma.finishedGood.update({
        where: { id },
        data: { calculatedCogs: newCogs },
      });
      const updated = await prisma.finishedGood.findUnique({
        where: { id },
        include: {
          recipeItems: {
            include: {
              rawMaterial: true,
              subAssembly: true,
            },
          },
        },
      });
      if (updated) finishedGood = updated;
    }
  }

  const allMaterials = await prisma.rawMaterial.findMany({
    orderBy: { name: "asc" },
  });

  const coreElements = await prisma.finishedGood.findMany({
    where: {
      isCoreElement: true,
      id: { not: id },
    },
    orderBy: { name: "asc" },
  });

  const recipeVersions = await prisma.recipeVersion.findMany({
    where: { finishedGoodId: id },
    orderBy: { versionNumber: "desc" },
  });

  return (
    <main className="min-h-screen bg-transparent text-text p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <a
          href="/finished-goods"
          className="text-text-brand hover:underline text-sm font-medium inline-block"
        >
          ← Back to Finished Goods
        </a>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-text">
              Recipe: {finishedGood.name}
              {finishedGood.isCoreElement && (
                <span className="ml-2 text-xs bg-brand-muted dark:bg-brand-muted-dark text-text-brand px-2 py-1 rounded-full">
                  Core Element
                </span>
              )}
            </h1>
            <p className="text-text-muted text-sm">
              COGS:{" "}
              <span className="text-warning font-semibold">
                {finishedGood.calculatedCogs != null
                  ? `$${finishedGood.calculatedCogs.toFixed(2)}`
                  : "—"}
              </span>
            </p>
          </div>
          <div className="flex flex-col gap-2 items-end">
            <PourSheetButton
              productName={finishedGood.name}
              batchCode={finishedGood.batchCode}
              recipeItems={finishedGood.recipeItems.map((item) => ({
                id: item.id,
                name: item.rawMaterial?.name ?? item.subAssembly?.name ?? "Unknown",
                requiredQuantity: item.requiredQuantity,
                unit: item.unit,
                isSubAssembly: !!item.subAssemblyId,
              }))}
              batchNotes={finishedGood.batchNotes}
              calculatedCogs={finishedGood.calculatedCogs}
            />
            <VersionHistory
              versions={recipeVersions.map((v) => ({
                id: v.id,
                versionNumber: v.versionNumber,
                recipeSnapshot: v.recipeSnapshot,
                createdAt: v.createdAt.toISOString(),
              }))}
            />
          </div>
        </div>

        {/* Core Element Toggle */}
        <div className="bg-surface-widget border border-default rounded-xl p-5">
          <form action={toggleCoreElement} className="flex items-center gap-3">
            <input type="hidden" name="id" value={finishedGood.id} />
            <input
              type="checkbox"
              name="isCoreElement"
              id="isCoreElement"
              defaultChecked={finishedGood.isCoreElement}
              className="rounded border-default accent-brand"
            />
            <label htmlFor="isCoreElement" className="flex items-center text-text text-sm font-medium">
              Mark as Core Element
              <HelpTip text="A Core Element is a product you make once and then reuse as an ingredient in other products — like a ready-made building block." />
            </label>
            <button
              type="submit"
              className="ml-auto bg-[#4f8792] hover:bg-[#426f79] text-white text-xs font-medium px-4 py-2 rounded-full"
            >
              Save
            </button>
            <HelpTip text="Saves the Core Element setting for this product." />
          </form>
        </div>

        {finishedGood.vesselSizeOz != null && (
          <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted">
            <span>
              Vessel Size: <span className="font-medium text-text">{finishedGood.vesselSizeOz} oz</span>
            </span>
            {finishedGood.fragranceLoadPercent != null && (
              <span>
                Fragrance Load: <span className="font-medium text-text">{finishedGood.fragranceLoadPercent}%</span>
              </span>
            )}
          </div>
        )}

        <UnitConverter />

        <AddRecipeForm
          finishedGoodId={finishedGood.id}
          materials={allMaterials}
          subAssemblies={coreElements}
          addAction={addRecipeItem}
        />

        <div className="bg-surface-widget border border-default rounded-xl overflow-hidden">
          <div className="p-5 border-b border-default">
            <h2 className="text-lg font-semibold text-text text-center">Current Recipe</h2>
          </div>
          {finishedGood.recipeItems.length === 0 ? (
            <div className="text-center py-12 text-text-muted">
              No ingredients yet. Add your first ingredient above.
            </div>
          ) : (
            <RecipeTableClient
              items={finishedGood.recipeItems}
              finishedGoodId={finishedGood.id}
              updateAction={updateRecipeItem}
              deleteAction={deleteRecipeItem}
            />
          )}
        </div>
      </div>
    </main>
  );
}