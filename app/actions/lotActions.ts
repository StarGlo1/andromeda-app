"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { generateLotNumber } from "@/app/lib/lots";

export async function createRawMaterialLot(formData: FormData) {
  const rawMaterialId = String(formData.get("rawMaterialId") || "");
  const quantity = parseFloat(String(formData.get("quantity") || ""));

  if (!rawMaterialId || isNaN(quantity) || quantity <= 0) {
    throw new Error("Raw material and a valid quantity are required.");
  }

  const lotNumber = await generateLotNumber();

  await prisma.lot.create({
    data: {
      lotNumber,
      kind: "RAW_MATERIAL",
      rawMaterialId,
      quantity,
    },
  });

  revalidatePath(`/raw-materials/${rawMaterialId}`);
  revalidatePath("/lots");
}

export async function createFinishedGoodLot(formData: FormData) {
  const finishedGoodId = String(formData.get("finishedGoodId") || "");
  const quantity = parseFloat(String(formData.get("quantity") || "0"));
  const entriesJson = String(formData.get("entries") || "[]");

  let entries: { rawMaterialLotId: string; quantityUsed: number }[] = [];

  try {
    entries = JSON.parse(entriesJson);
  } catch {
    throw new Error("Invalid raw material lot entries.");
  }

  if (!finishedGoodId || entries.length === 0) {
    throw new Error("Finished good and at least one raw material lot are required.");
  }

  // Optionally validate raw material lot IDs
  const rawLots = await prisma.lot.findMany({
    where: {
      id: { in: entries.map((e) => e.rawMaterialLotId) },
      kind: "RAW_MATERIAL",
    },
  });

  if (rawLots.length !== entries.length) {
    throw new Error("One or more selected raw material lots are invalid.");
  }

  const lotNumber = await generateLotNumber();

  await prisma.lot.create({
    data: {
      lotNumber,
      kind: "FINISHED_GOOD",
      finishedGoodId,
      quantity: isNaN(quantity) ? null : quantity,
      rawMaterialLinks: {
        create: entries.map((entry) => ({
          rawMaterialLotId: entry.rawMaterialLotId,
          quantityUsed: entry.quantityUsed,
        })),
      },
    },
  });

  revalidatePath(`/finished-goods/${finishedGoodId}`);
  revalidatePath("/lots");
}