"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteSaleAction(formData: FormData) {
  const id = String(formData.get("id") || "");

  if (!id) return;

  const sale = await prisma.sale.findUnique({
    where: { id },
    include: { items: true },
  });

  if (sale) {
    for (const item of sale.items) {
      await prisma.finishedGood.update({
        where: { id: item.finishedGoodId },
        data: {
          quantityOnHand: { increment: item.quantity },
        },
      });
    }
  }

  await prisma.sale.delete({ where: { id } });
  revalidatePath("/sales");
  revalidatePath("/");
}
