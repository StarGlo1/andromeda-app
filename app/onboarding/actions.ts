"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function seedCategories(categoryNames: string[]) {
  for (const name of categoryNames) {
    // Skip if already exists
    const existing = await prisma.category.findUnique({ where: { name } });
    if (!existing) {
      await prisma.category.create({ data: { name } });
    }
  }
  revalidatePath("/");
}