// app/consignment/page.tsx

import React from "react";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { ConstellationManager } from "@/app/components/ConstellationManager";
import { OutpostHelpTip } from "@/app/components/OutpostHelpTip";
import { Store } from "lucide-react";

// ─── Server Actions ───

async function addLocationAction(formData: FormData) {
  "use server";

  const name = String(formData.get("name") || "").trim();
  const type = String(formData.get("type") || "storefront");
  const address = String(formData.get("address") || "").trim() || null;
  const contactName = String(formData.get("contactName") || "").trim() || null;
  const phone = String(formData.get("phone") || "").trim() || null;
  const email = String(formData.get("email") || "").trim() || null;
  const notes = String(formData.get("notes") || "").trim() || null;

  if (!name) {
    throw new Error("Location name is required.");
  }

  await prisma.consignmentLocation.create({
    data: {
      name,
      type,
      address,
      contactName,
      phone,
      email,
      notes,
    },
  });

  revalidatePath("/consignment");
}

async function deleteLocationAction(formData: FormData) {
  "use server";

  const id = String(formData.get("id") || "");

  if (!id) {
    throw new Error("Location ID is required.");
  }

  await prisma.consignmentLocation.delete({
    where: { id },
  });

  revalidatePath("/consignment");
}

async function createBatchAction(formData: FormData) {
  "use server";

  const locationId = String(formData.get("locationId") || "");
  const datePlaced = new Date(String(formData.get("datePlaced") || new Date()));
  const expectedReturnDate = formData.get("expectedReturnDate")
    ? new Date(String(formData.get("expectedReturnDate")))
    : null;
  const notes = String(formData.get("notes") || "").trim() || null;

  if (!locationId) {
    throw new Error("Location is required.");
  }

  const itemsJson = String(formData.get("items") || "[]");
  const items = JSON.parse(itemsJson);

  if (!items || items.length === 0) {
    throw new Error("At least one product is required.");
  }

  await prisma.consignmentBatch.create({
    data: {
      locationId,
      datePlaced,
      expectedReturnDate,
      notes,
      status: "active",
      items: {
        create: items.map((item: any) => ({
          finishedGoodId: item.finishedGoodId,
          quantity: item.quantity,
          unitPrice: item.unitPrice || 0,
        })),
      },
    },
  });

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

  revalidatePath("/consignment");
  revalidatePath("/finished-goods");
}

async function markBatchReturnedAction(formData: FormData) {
  "use server";

  const batchId = String(formData.get("batchId") || "");

  if (!batchId) {
    throw new Error("Batch ID is required.");
  }

  const batch = await prisma.consignmentBatch.findUnique({
    where: { id: batchId },
    include: { items: true },
  });

  if (!batch) {
    throw new Error("Batch not found.");
  }

  for (const item of batch.items) {
    await prisma.finishedGood.update({
      where: { id: item.finishedGoodId },
      data: {
        quantityOnHand: {
          increment: item.quantity,
        },
      },
    });
  }

  await prisma.consignmentBatch.update({
    where: { id: batchId },
    data: {
      status: "returned",
      returnedDate: new Date(),
    },
  });

  revalidatePath("/consignment");
  revalidatePath("/finished-goods");
}

export default async function ConsignmentPage() {
  const [locations, batches, finishedGoods] = await Promise.all([
    prisma.consignmentLocation.findMany({
      orderBy: { name: "asc" },
      include: {
        batches: {
          include: {
            items: {
              include: {
                finishedGood: true,
              },
            },
          },
        },
      },
    }),
    prisma.consignmentBatch.findMany({
      orderBy: { datePlaced: "desc" },
      include: {
        location: true,
        items: {
          include: {
            finishedGood: true,
          },
        },
      },
    }),
    prisma.finishedGood.findMany({
      where: { quantityOnHand: { gt: 0 } },
      orderBy: { name: "asc" },
    }),
  ]);

  const activeLocations = locations.filter((loc) =>
    loc.batches.some((batch) => batch.status === "active")
  ).length;

  const activeBatches = batches.filter((batch) => batch.status === "active");
  const overdueBatches = batches.filter((batch) => {
    if (batch.status !== "active" || !batch.expectedReturnDate) return false;
    return new Date(batch.expectedReturnDate) < new Date();
  });

  const totalUnitsOut = activeBatches.reduce(
    (sum, batch) =>
      sum + batch.items.reduce((s, item) => s + item.quantity, 0),
    0
  );

  const totalValueOut = activeBatches.reduce(
    (sum, batch) =>
      sum +
      batch.items.reduce(
        (s, item) => s + item.quantity * (item.unitPrice || item.finishedGood.retailPrice),
        0
      ),
    0
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mt-3">
          Constellation Stock
        </h1>
        <p className="mt-2 text-sm max-w-6xl text-gray-900 dark:text-gray-100">
          Track products you've placed in shops, boutiques, or markets to sell on your behalf. 
          Add the places where your products are selling, send them inventory, and keep track 
          of what's out there and what's come back.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-2">
            <Store className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">ACTIVE OUTPOSTS</h3>
            <OutpostHelpTip />
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-gray-100">{activeLocations}</p>
        </div>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6 rounded-xl shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">UNITS IN CONSTELLATION</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-gray-100">{totalUnitsOut}</p>
        </div>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6 rounded-xl shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">CONSTELLATION VALUE</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
            ${totalValueOut.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Overdue Alert */}
      {overdueBatches.length > 0 && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
          <h3 className="font-semibold text-red-800 dark:text-red-300">
            ⚠️ {overdueBatches.length} Overdue Batch{overdueBatches.length > 1 ? "es" : ""}
          </h3>
          <div className="mt-2 space-y-1">
            {overdueBatches.map((batch) => (
              <p key={batch.id} className="text-sm text-red-700 dark:text-red-400">
                {batch.location.name} - due{" "}
                {batch.expectedReturnDate?.toLocaleDateString()}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Main Manager Component */}
      <ConstellationManager
        locations={locations}
        batches={batches}
        finishedGoods={finishedGoods}
        addLocationAction={addLocationAction}
        deleteLocationAction={deleteLocationAction}
        createBatchAction={createBatchAction}
        markBatchReturnedAction={markBatchReturnedAction}
      />
    </div>
  );
}