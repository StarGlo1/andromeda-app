// app/quick-log/page.tsx

import React from "react";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { QuickLogManager } from "@/app/components/QuickLogManager";

// ─── Server Actions ───

async function createEventAction(formData: FormData) {
  "use server";

  const name = String(formData.get("name") || "").trim();
  const date = new Date(String(formData.get("date") || new Date()));
  const location = String(formData.get("location") || "").trim() || null;
  const type = String(formData.get("type") || "popup");
  const notes = String(formData.get("notes") || "").trim() || null;

  if (!name) {
    throw new Error("Event name is required.");
  }

  await prisma.event.create({
    data: {
      name,
      date,
      location,
      type,
      notes,
    },
  });

  revalidatePath("/quick-log");
}

async function checkoutAction(formData: FormData) {
  "use server";

  const eventId = String(formData.get("eventId") || "") || null;
  const itemsJson = String(formData.get("items") || "[]");
  const items = JSON.parse(itemsJson);

  if (!items || items.length === 0) {
    throw new Error("No items in cart.");
  }

  const totalAmount = items.reduce(
    (sum: number, item: any) => sum + item.quantity * item.unitPrice,
    0
  );

  // Create sale
  await prisma.sale.create({
    data: {
      eventId,
      saleDate: new Date(),
      totalAmount,
      status: "Paid",
      items: {
        create: items.map((item: any) => ({
          finishedGoodId: item.finishedGoodId,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          totalPrice: item.quantity * item.unitPrice,
        })),
      },
    },
  });

  // Update inventory
  for (const item of items) {
    await prisma.finishedGood.update({
      where: { id: item.finishedGoodId },
      data: {
        quantityOnHand: {
          decrement: item.quantity,
        },
      },
    });
  }

  revalidatePath("/quick-log");
  revalidatePath("/sales");
  revalidatePath("/finished-goods");
}

export default async function QuickLogPage() {
  const [events, finishedGoods] = await Promise.all([
    prisma.event.findMany({
      orderBy: { date: "desc" },
      take: 10,
    }),
    prisma.finishedGood.findMany({
      where: { quantityOnHand: { gt: 0 } },
      orderBy: { name: "asc" },
    }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mt-3">
          Quick Log
        </h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 max-w-3xl">
          Fast sales logging for pop-ups, craft fairs, and farmers markets. 
          Tap a product to add it to your cart, adjust quantities, and checkout 
          in seconds.
        </p>
      </div>

      <QuickLogManager
        events={events}
        finishedGoods={finishedGoods}
        createEventAction={createEventAction}
        checkoutAction={checkoutAction}
      />
    </div>
  );
}