// app/adjustments/page.tsx

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import Navbar from "@/app/components/Navbar";
import { AdjustmentForm } from "./AdjustmentForm";
import { AdjustmentRow } from "./AdjustmentRow";
import { AdjustmentHistoryFilters } from "./AdjustmentHistoryFilters";
import { Prisma } from "@prisma/client";

async function addAdjustment(formData: FormData) {
  "use server";
  const materialId = formData.get("materialId") as string;
  const quantity = parseFloat(formData.get("quantity") as string) || 0;
  const reason = formData.get("reason") as string;
  const notes = formData.get("notes") as string;

  if (!materialId || !quantity || !reason) return;

  await prisma.adjustment.create({
    data: { materialId, quantity, reason, notes: notes || null },
  });

  const material = await prisma.rawMaterial.findUnique({
    where: { id: materialId },
  });
  if (material) {
    await prisma.rawMaterial.update({
      where: { id: materialId },
      data: { totalQuantity: (material.totalQuantity ?? 0) + quantity },
    });
  }

  revalidatePath("/adjustments");
}

async function updateAdjustmentAction(formData: FormData) {
  "use server";

  const id = formData.get("id") as string;
  const materialId = formData.get("materialId") as string;
  const quantity = parseFloat(formData.get("quantity") as string) || 0;
  const reason = formData.get("reason") as string;

  if (!id || !materialId || !reason) return;

  const oldAdjustment = await prisma.adjustment.findUnique({
    where: { id },
  });

  if (oldAdjustment) {
    await prisma.rawMaterial.update({
      where: { id: oldAdjustment.materialId },
      data: {
        totalQuantity: {
          decrement: oldAdjustment.quantity,
        },
      },
    });

    await prisma.rawMaterial.update({
      where: { id: materialId },
      data: {
        totalQuantity: {
          increment: quantity,
        },
      },
    });

    await prisma.adjustment.update({
      where: { id },
      data: {
        materialId,
        quantity,
        reason,
      },
    });
  }

  revalidatePath("/adjustments");
}

interface SearchParams {
  materialId?: string;
  reason?: string;
  startDate?: string;
  endDate?: string;
}

export default async function AdjustmentsPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const where: Prisma.AdjustmentWhereInput = {};

  if (searchParams?.materialId) {
    where.materialId = searchParams.materialId;
  }
  if (searchParams?.reason) {
    where.reason = searchParams.reason;
  }
  if (searchParams?.startDate || searchParams?.endDate) {
    where.createdAt = {};
    if (searchParams?.startDate) {
      where.createdAt.gte = new Date(searchParams.startDate);
    }
    if (searchParams?.endDate) {
      const endDate = new Date(searchParams.endDate);
      endDate.setHours(23, 59, 59, 999);
      where.createdAt.lte = endDate;
    }
  }

  const adjustments = await prisma.adjustment.findMany({
    where,
    include: { material: { select: { id: true, name: true, unit: true } } },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    include: {
      rawMaterials: {
        select: { id: true, name: true, unit: true },
        orderBy: { name: "asc" },
      },
    },
  });

  const allMaterials = await prisma.rawMaterial.findMany({
    select: { id: true, name: true, unit: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-text mt-3">
          Stock Adjustments
        </h1>
        <p className="text-sm text-text-muted mt-1">
          Record inventory changes for testing, gifting, loss, damage, restocking, or corrections.
        </p>
      </div>

      <div className="bg-surface-widget border border-default rounded-xl p-6">
        <h2 className="text-lg font-semibold text-text mb-4">
          Stock Adjustment
        </h2>
        <AdjustmentForm
          categories={categories}
          addAdjustmentAction={addAdjustment}
        />
      </div>

      <div className="bg-surface-widget border border-default rounded-xl overflow-hidden">
        <div className="p-5 border-b border-default space-y-4">
          <h2 className="text-lg font-semibold text-text">
            Adjustment History
          </h2>
          <AdjustmentHistoryFilters
            materials={allMaterials.map((m) => ({ id: m.id, name: m.name }))}
            onFilterChange={async (filters) => {
              "use server";
              const params = new URLSearchParams();
              if (filters.materialId) params.set("materialId", filters.materialId);
              if (filters.reason) params.set("reason", filters.reason);
              if (filters.startDate) params.set("startDate", filters.startDate);
              if (filters.endDate) params.set("endDate", filters.endDate);
              const queryString = params.toString();
              return queryString ? `?${queryString}` : "";
            }}
          />
        </div>
        {adjustments.length === 0 ? (
          <div className="text-center py-12 text-text-muted">
            No adjustments found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-default bg-[#d3dfe1] text-text-muted text-xs uppercase tracking-wider">
                  <th className="p-4 text-center">Material</th>
                  <th className="p-4 text-center">Change</th>
                  <th className="p-4 text-center">Reason</th>
                  <th className="p-4 text-center">Date</th>
                  <th className="p-4 text-center">Time</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-default text-sm">
                {adjustments.map((adj, index) => (
                  <AdjustmentRow
                    key={adj.id}
                    adjustment={adj}
                    materials={allMaterials}
                    updateAdjustmentAction={updateAdjustmentAction}
                    index={index}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}