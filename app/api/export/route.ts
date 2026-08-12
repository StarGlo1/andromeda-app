import { prisma } from "@/lib/prisma";
import JSZip from "jszip";

function toCSV(data: any[], columns: string[]): string {
  const header = columns.join(",");
  const rows = data.map((item) =>
    columns.map((col) => {
      const val = item[col] !== undefined ? item[col] : "";
      const str = String(val).replace(/"/g, '""');
      return /[",\n]/.test(str) ? `"${str}"` : str;
    }).join(",")
  );
  return [header, ...rows].join("\n");
}

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      select: { id: true, name: true },
    });

    const rawMaterials = await prisma.rawMaterial.findMany({
      include: { category: true },
    });

    const finishedGoods = await prisma.finishedGood.findMany();

    const recipeItems = await prisma.recipeItem.findMany({
      include: {
        rawMaterial: { select: { name: true } },
        finishedGood: { select: { name: true } },
      },
    });

    const categoriesCSV = toCSV(categories, ["id", "name"]);

    const rawMaterialsCSV = toCSV(
      rawMaterials.map((m) => ({
        id: m.id,
        name: m.name,
        category: m.category.name,
        totalQuantity: m.totalQuantity ?? "",
        unit: m.unit ?? "",
        costPerUnit: m.costPerUnit ?? "",
        reorderThreshold: m.reorderThreshold ?? "",
        createdAt: m.createdAt.toISOString(),
        updatedAt: m.updatedAt.toISOString(),
      })),
      ["id", "name", "category", "totalQuantity", "unit", "costPerUnit", "reorderThreshold", "createdAt", "updatedAt"]
    );

    const finishedGoodsCSV = toCSV(
      finishedGoods.map((g) => ({
        id: g.id,
        name: g.name,
        sku: g.sku ?? "",
        batchCode: g.batchCode,
        retailPrice: g.retailPrice,
        quantityOnHand: g.quantityOnHand,
        calculatedCogs: g.calculatedCogs,
        createdAt: g.createdAt.toISOString(),
        updatedAt: g.updatedAt.toISOString(),
      })),
      ["id", "name", "sku", "batchCode", "retailPrice", "quantityOnHand", "calculatedCogs", "createdAt", "updatedAt"]
    );

    const recipeItemsCSV = toCSV(
      recipeItems.map((r) => ({
        id: r.id,
        finishedGood: r.finishedGood.name,
        rawMaterial: r.rawMaterial.name,
        requiredQuantity: r.requiredQuantity,
        unit: r.unit,
      })),
      ["id", "finishedGood", "rawMaterial", "requiredQuantity", "unit"]
    );

    const zip = new JSZip();
    zip.file("categories.csv", categoriesCSV);
    zip.file("raw_materials.csv", rawMaterialsCSV);
    zip.file("finished_goods.csv", finishedGoodsCSV);
    zip.file("recipe_items.csv", recipeItemsCSV);

    const zipBuffer = await zip.generateAsync({ type: "nodebuffer" });

    return new Response(zipBuffer, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename=andromeda-export-${new Date().toISOString().slice(0, 10)}.zip`,
      },
    });
  } catch (error: any) {
    return new Response(`Export failed: ${error.message}`, { status: 500 });
  }
}