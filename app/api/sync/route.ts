import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const actions = body.actions || [];
    const results = [];

    for (const action of actions) {
      if (action.type === "produce") {
        const { finishedGoodId, batchSize } = action.payload;

        const recipeItems = await prisma.recipeItem.findMany({
          where: { finishedGoodId },
          include: { rawMaterial: true, subAssembly: true },
        });

        if (recipeItems.length === 0) {
          results.push({ id: action.id, success: false, error: "No recipe found" });
          continue;
        }

        const product = await prisma.finishedGood.findUnique({ where: { id: finishedGoodId } });
        if (!product) {
          results.push({ id: action.id, success: false, error: "Product not found" });
          continue;
        }

        let materialCost = 0;
        let failed = false;

        for (const item of recipeItems) {
          if (item.rawMaterialId && item.rawMaterial) {
            const required = item.requiredQuantity * batchSize;
            const currentStock = item.rawMaterial.totalQuantity ?? 0;
            if (currentStock < required) {
              results.push({ id: action.id, success: false, error: `Not enough ${item.rawMaterial.name}` });
              failed = true;
              break;
            }
            await prisma.rawMaterial.update({
              where: { id: item.rawMaterial.id },
              data: { totalQuantity: currentStock - required },
            });
            materialCost += required * (item.rawMaterial.costPerUnit ?? 0);
          }
        }

        if (failed) continue;

        const currentTotalUnits = product.quantityOnHand;
        const currentTotalCost = currentTotalUnits * (product.calculatedCogs ?? 0);
        const newTotalUnits = currentTotalUnits + batchSize;
        const newAvgCost = currentTotalUnits > 0
          ? (currentTotalCost + materialCost) / newTotalUnits
          : materialCost / batchSize;

        await prisma.finishedGood.update({
          where: { id: finishedGoodId },
          data: { quantityOnHand: newTotalUnits, calculatedCogs: newAvgCost },
        });

        results.push({ id: action.id, success: true });
      }
    }

    return NextResponse.json({ results });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
