"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getAverageCosts() {
  const waxMaterials = await prisma.rawMaterial.findMany({
    where: { category: { name: "Wax" } },
    select: { costPerUnit: true, unit: true },
  });

  const fragranceMaterials = await prisma.rawMaterial.findMany({
    where: { category: { name: { in: ["Fragrance Oil", "Fragrance Oils"] } } },
    select: { costPerUnit: true, unit: true },
  });

  const avgWaxCost = waxMaterials.length > 0
    ? waxMaterials.reduce((sum, m) => sum + (m.costPerUnit ?? 0), 0) / waxMaterials.length
    : 0;

  const avgFragranceCost = fragranceMaterials.length > 0
    ? fragranceMaterials.reduce((sum, m) => sum + (m.costPerUnit ?? 0), 0) / fragranceMaterials.length
    : 0;

  const waxUnit = waxMaterials.length > 0 ? (waxMaterials[0].unit || "lb") : "lb";
  const fragranceUnit = fragranceMaterials.length > 0 ? (fragranceMaterials[0].unit || "oz") : "oz";

  return { avgWaxCost, avgFragranceCost, waxUnit, fragranceUnit };
}

export async function createRecipeFromBatch(
  totalWaxOz: number,
  totalFragranceOz: number,
  waxBlends: { name: string; oz: number }[],
  fragranceBlends: { name: string; oz: number }[],
  vesselSizeOz: number,
  fragranceLoadPercent: number,
  primaryFragranceMaterialId?: string,
  fragranceMaterialIds?: (string | undefined)[]
) {
  const waxMaterial = await prisma.rawMaterial.findFirst({
    where: { category: { name: "Wax" } },
    orderBy: { createdAt: "desc" },
  });

  let primaryMaterial = null;
  if (primaryFragranceMaterialId) {
    primaryMaterial = await prisma.rawMaterial.findUnique({
      where: { id: primaryFragranceMaterialId },
    });
  }
  if (!primaryMaterial) {
    primaryMaterial = await prisma.rawMaterial.findFirst({
      where: { category: { name: { in: ["Fragrance Oil", "Fragrance Oils"] } } },
      orderBy: { createdAt: "desc" },
    });
  }

  const product = await prisma.finishedGood.create({
    data: {
      name: `Batch ${new Date().toLocaleDateString()}`,
      batchCode: `BATCH-${Date.now()}`,
      retailPrice: 0,
      quantityOnHand: 0,
      vesselSizeOz,
      fragranceLoadPercent,
    },
  });

  if (waxMaterial) {
    await prisma.recipeItem.create({
      data: {
        finishedGoodId: product.id,
        rawMaterialId: waxMaterial.id,
        requiredQuantity: totalWaxOz,
        unit: "oz",
      },
    });
  }

  if (totalFragranceOz > 0 && primaryMaterial) {
    const blendCount = fragranceBlends.length;

    if (blendCount > 1 && fragranceMaterialIds && fragranceMaterialIds.length > 0) {
      for (let i = 0; i < fragranceBlends.length; i++) {
        const blend = fragranceBlends[i];
        if (blend.oz <= 0) continue;

        const materialId = fragranceMaterialIds[i];
        if (!materialId) {
          throw new Error(`Blend "${blend.name}" has no material selected.`);
        }

        const material = await prisma.rawMaterial.findUnique({ where: { id: materialId } });
        if (!material) {
          throw new Error(`Blend "${blend.name}" uses an invalid material.`);
        }

        await prisma.recipeItem.create({
          data: {
            finishedGoodId: product.id,
            rawMaterialId: material.id,
            requiredQuantity: blend.oz,
            unit: "oz",
          },
        });
      }
    } else {
      let material = primaryMaterial;
      if (fragranceMaterialIds && fragranceMaterialIds.length > 0 && fragranceMaterialIds[0]) {
        const found = await prisma.rawMaterial.findUnique({
          where: { id: fragranceMaterialIds[0] },
        });
        if (found) material = found;
      }

      await prisma.recipeItem.create({
        data: {
          finishedGoodId: product.id,
          rawMaterialId: material.id,
          requiredQuantity: totalFragranceOz,
          unit: "oz",
        },
      });
    }
  }

  revalidatePath("/finished-goods");
  redirect(`/finished-goods/${product.id}/recipe`);
}

export async function getFragranceOils() {
  const oils = await prisma.rawMaterial.findMany({
    where: {
      category: {
        name: {
          in: ["Fragrance Oil", "Fragrance Oils"],
        },
      },
    },
    select: {
      id: true,
      name: true,
      unit: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  return oils.map((oil) => ({
    id: oil.id,
    name: oil.name,
    unit: oil.unit ?? "oz",
  }));
}

export async function saveBatchNoteToProduct(productId: string, batchNote: string) {
  if (!productId || !batchNote) {
    throw new Error("Product and note are required.");
  }

  await prisma.finishedGood.update({
    where: { id: productId },
    data: { batchNotes: batchNote },
  });

  revalidatePath(`/finished-goods/${productId}/recipe`);
  return { success: true };
}

export async function getFinishedGoodsForBatchSave() {
  const products = await prisma.finishedGood.findMany({
    select: { id: true, name: true, batchCode: true },
    orderBy: { name: "asc" },
  });

  return products;
}