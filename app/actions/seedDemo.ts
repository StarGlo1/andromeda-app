"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function seedDemoData() {
  try {
    // ── Categories ──
    const categories = [
      "Wax",
      "Wick",
      "Fragrance Oil",
      "Vessel",
      "Lid",
      "Label & Sticker",
      "Packaging",
      "Additive",
    ];
    const categoryMap: Record<string, string> = {};
    for (const name of categories) {
      let cat = await prisma.category.findUnique({ where: { name } });
      if (!cat) {
        cat = await prisma.category.create({ data: { name } });
      }
      categoryMap[name] = cat.id;
    }

    // ── Suppliers ──
    const supplierNames = ["Lone Star Candle Supply", "The Flaming Candle", "Wholesale Supplies Plus", "Amazon"];
    const suppliers: { id: string; name: string }[] = [];
    for (const name of supplierNames) {
      let sup = await prisma.supplier.findFirst({ where: { name } });
      if (!sup) {
        sup = await prisma.supplier.create({ data: { name } });
      }
      suppliers.push(sup);
    }

    // ── Raw Materials ──
    const rawMaterials = [
      { name: "Ceda-Serica Wax", category: "Wax", unit: "lb", cost: 4.51, qty: 20, supplier: "Lone Star Candle Supply" },
      { name: "ECO 2 Wicks", category: "Wick", unit: "piece", cost: 0.09, qty: 100, supplier: "Amazon" },
      { name: "Bergamot Fragrance Oil", category: "Fragrance Oil", unit: "oz", cost: 4.15, qty: 16, supplier: "Lone Star Candle Supply" },
      { name: "Coconut Milk Fragrance Oil", category: "Fragrance Oil", unit: "oz", cost: 3.27, qty: 20, supplier: "Wholesale Supplies Plus" },
      { name: "8oz Tumbler Vessel", category: "Vessel", unit: "piece", cost: 1.20, qty: 50, supplier: "The Flaming Candle" },
      { name: "Warning Label Stickers", category: "Label & Sticker", unit: "piece", cost: 0.007, qty: 1000, supplier: "Amazon" },
    ];

    for (const rm of rawMaterials) {
      const existing = await prisma.rawMaterial.findFirst({
        where: { name: rm.name },
      });
      if (!existing) {
        const supplier = suppliers.find(s => s.name === rm.supplier);
        await prisma.rawMaterial.create({
          data: {
            name: rm.name,
            categoryId: categoryMap[rm.category],
            supplierId: supplier?.id || null,
            unit: rm.unit,
            costPerUnit: rm.cost,
            totalQuantity: rm.qty,
            reorderThreshold: rm.qty * 0.2,
          },
        });
      }
    }

    // ── Sub‑Assembly: "Vanilla Blend" ──
    const vanillaBlend = await prisma.finishedGood.findFirst({
      where: { name: "Vanilla Blend Fragrance Oil" },
    });
    if (!vanillaBlend) {
      const sub = await prisma.finishedGood.create({
        data: {
          name: "Vanilla Blend Fragrance Oil",
          batchCode: "SUB-001",
          retailPrice: 0,
          quantityOnHand: 0,
          isSubAssembly: true,
          calculatedCogs: 0,
        },
      });
      // Add ingredients to sub‑assembly
      const bergamot = await prisma.rawMaterial.findFirst({ where: { name: "Bergamot Fragrance Oil" } });
      const coconutMilk = await prisma.rawMaterial.findFirst({ where: { name: "Coconut Milk Fragrance Oil" } });
      if (bergamot) {
        await prisma.recipeItem.create({
          data: {
            finishedGoodId: sub.id,
            rawMaterialId: bergamot.id,
            requiredQuantity: 3,
            unit: "oz",
          },
        });
      }
      if (coconutMilk) {
        await prisma.recipeItem.create({
          data: {
            finishedGoodId: sub.id,
            rawMaterialId: coconutMilk.id,
            requiredQuantity: 5,
            unit: "oz",
          },
        });
      }
      // Recalculate COGS for sub
      // We'll just set it manually for demo
      await prisma.finishedGood.update({
        where: { id: sub.id },
        data: { calculatedCogs: 4.50 },
      });
    }

    // ── Final Product: "Vanilla Candle" ──
    const product = await prisma.finishedGood.findFirst({
      where: { name: "Vanilla Candle" },
    });
    if (!product) {
      const prod = await prisma.finishedGood.create({
        data: {
          name: "Vanilla Candle",
          sku: "VAN-8",
          batchCode: "B001-2026",
          retailPrice: 18.00,
          quantityOnHand: 0,
          vesselSizeOz: 8,
          fragranceLoadPercent: 10,
          calculatedCogs: 0,
        },
      });
      // Add ingredients: wax, wick, vessel, sub‑assembly
      const wax = await prisma.rawMaterial.findFirst({ where: { name: "Ceda-Serica Wax" } });
      const wick = await prisma.rawMaterial.findFirst({ where: { name: "ECO 2 Wicks" } });
      const vessel = await prisma.rawMaterial.findFirst({ where: { name: "8oz Tumbler Vessel" } });
      const sub = await prisma.finishedGood.findFirst({ where: { name: "Vanilla Blend Fragrance Oil" } });
      if (wax) {
        await prisma.recipeItem.create({
          data: {
            finishedGoodId: prod.id,
            rawMaterialId: wax.id,
            requiredQuantity: 6,
            unit: "oz",
          },
        });
      }
      if (wick) {
        await prisma.recipeItem.create({
          data: {
            finishedGoodId: prod.id,
            rawMaterialId: wick.id,
            requiredQuantity: 1,
            unit: "piece",
          },
        });
      }
      if (vessel) {
        await prisma.recipeItem.create({
          data: {
            finishedGoodId: prod.id,
            rawMaterialId: vessel.id,
            requiredQuantity: 1,
            unit: "piece",
          },
        });
      }
      if (sub) {
        await prisma.recipeItem.create({
          data: {
            finishedGoodId: prod.id,
            subAssemblyId: sub.id,
            requiredQuantity: 0.8,
            unit: "oz",
          },
        });
      }
      // Recalculate COGS (we'll update manually)
      await prisma.finishedGood.update({
        where: { id: prod.id },
        data: { calculatedCogs: 6.75 },
      });
    }

    revalidatePath("/");
    return { success: true, message: "Demo data seeded successfully!" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}