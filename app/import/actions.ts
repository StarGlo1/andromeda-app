"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// ---------------------------------------------------------------
// Helper: safely get a value from a row using multiple aliases
// ---------------------------------------------------------------
function getField(row: any, aliases: string[]): string | undefined {
  for (const alias of aliases) {
    // direct match
    if (row[alias] !== undefined) return row[alias];
    // case‑insensitive match
    const key = Object.keys(row).find(
      (k) => k.trim().toLowerCase() === alias.trim().toLowerCase()
    );
    if (key) return row[key];
  }
  return undefined;
}

// ---------- Find or create a category ----------
async function getOrCreateCategory(name: string) {
  let cat = await prisma.category.findUnique({ where: { name } });
  if (!cat) {
    cat = await prisma.category.create({ data: { name } });
  }
  return cat;
}

// ---------- Import Raw Materials ----------
export async function importRawMaterials(data: any[]) {
  let created = 0;
  let skipped = 0;

  for (const row of data) {
    const name = (getField(row, ["name", "material name", "item name", "raw material", "material"]) ?? "").trim();
    const categoryName = (getField(row, ["category", "category name", "type"]) ?? "").trim();

    if (!name || !categoryName) {
      skipped++;
      continue;
    }

    const category = await getOrCreateCategory(categoryName);

    const existing = await prisma.rawMaterial.findFirst({
      where: { name, categoryId: category.id },
    });
    if (existing) {
      skipped++;
      continue;
    }

    const totalQuantity = parseFloat(getField(row, ["totalquantity", "quantity", "qty", "in stock", "stock"]) ?? "0") || 0;
    const unit = (getField(row, ["unit", "unit of measure", "uom"]) ?? "").trim();
    const costPerUnit = parseFloat(getField(row, ["costperunit", "cost per unit", "unit cost", "cost"]) ?? "0") || 0;
    const reorderThreshold = parseFloat(getField(row, ["reorderthreshold", "reorder threshold", "reorder point", "min stock"]) ?? "") || null;

    await prisma.rawMaterial.create({
      data: {
        name,
        categoryId: category.id,
        totalQuantity,
        unit,
        costPerUnit,
        reorderThreshold: reorderThreshold ?? null,
      },
    });
    created++;
  }

  revalidatePath("/");
  return { created, skipped };
}

// ---------- Import Finished Goods ----------
export async function importFinishedGoods(data: any[]) {
  let created = 0;
  let skipped = 0;

  for (const row of data) {
    const name = (getField(row, ["name", "product name", "finished good", "item name"]) ?? "").trim();
    const batchCode = (getField(row, ["batchcode", "batch code", "batch", "lot number"]) ?? "").trim();

    if (!name || !batchCode) {
      skipped++;
      continue;
    }

    const sku = (getField(row, ["sku", "stock keeping unit"]) ?? "").trim() || null;

    if (sku) {
      const existingSKU = await prisma.finishedGood.findUnique({ where: { sku } });
      if (existingSKU) {
        skipped++;
        continue;
      }
    }

    const retailPrice = parseFloat(getField(row, ["retailprice", "retail price", "price"]) ?? "0") || 0;
    const quantityOnHand = parseInt(getField(row, ["quantityonhand", "quantity on hand", "qty on hand", "stock"]) ?? "0") || 0;

    await prisma.finishedGood.create({
      data: {
        name,
        sku,
        batchCode,
        retailPrice,
        quantityOnHand,
      },
    });
    created++;
  }

  revalidatePath("/finished-goods");
  return { created, skipped };
}

// ---------- Import Recipe Items ----------
export async function importRecipeItems(data: any[]) {
  let created = 0;
  let skipped = 0;

  for (const row of data) {
    const finishedGoodName = (getField(row, [
      "finishedgood", "finished good", "finished good name", "product name", "product"
    ]) ?? "").trim();

    const rawMaterialName = (getField(row, [
      "rawmaterial", "raw material", "raw material name", "material", "ingredient"
    ]) ?? "").trim();

    const requiredQuantity = parseFloat(getField(row, ["requiredquantity", "quantity", "amount"]) ?? "0") || 0;
    const unit = (getField(row, ["unit", "unit of measure", "uom"]) ?? "").trim();

    if (!finishedGoodName || !rawMaterialName || !unit) {
      skipped++;
      continue;
    }

    const good = await prisma.finishedGood.findFirst({ where: { name: finishedGoodName } });
    if (!good) {
      skipped++;
      continue;
    }

    const material = await prisma.rawMaterial.findFirst({ where: { name: rawMaterialName } });
    if (!material) {
      skipped++;
      continue;
    }

    const exists = await prisma.recipeItem.findUnique({
      where: {
        finishedGoodId_rawMaterialId: {
          finishedGoodId: good.id,
          rawMaterialId: material.id,
        },
      },
    });
    if (exists) {
      skipped++;
      continue;
    }

    await prisma.recipeItem.create({
      data: {
        finishedGoodId: good.id,
        rawMaterialId: material.id,
        requiredQuantity,
        unit,
      },
    });
    created++;
  }

  revalidatePath("/");
  return { created, skipped };
}