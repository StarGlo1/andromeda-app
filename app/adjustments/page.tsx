import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import Navbar from "@/app/components/Navbar";
import { AdjustmentForm } from "./AdjustmentForm";

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

export default async function AdjustmentsPage() {
  const adjustments = await prisma.adjustment.findMany({
    include: { material: { select: { id: true, name: true, unit: true } } },
    orderBy: { createdAt: "desc" },
    take: 50,
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

  return (
    <div className="max-w-6xl mx-auto space-y-8">
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
        <div className="p-5 border-b border-default">
          <h2 className="text-lg font-semibold text-text">
            Adjustment History
          </h2>
        </div>
        {adjustments.length === 0 ? (
          <div className="text-center py-12 text-text-muted">
            No adjustments yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-default bg-[#d3dfe1] text-text-muted text-xs uppercase tracking-wider">
                  <th className="p-4">Material</th>
                  <th className="p-4">Change</th>
                  <th className="p-4">Reason</th>
                  <th className="p-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-default text-sm">
                {adjustments.map((adj, index) => (
                  <tr
                    key={adj.id}
                    className={`${
                      index % 2 === 0
                        ? "bg-[#ede6dc] hover:bg-[#c5d9dd]"
                        : "bg-[#e0d6c9] hover:bg-[#c5d9dd]"
                    } transition-colors`}
                  >
                    <td className="p-4 font-medium text-text">
                      {adj.material.name}
                    </td>
                    <td
                      className={`p-4 ${adj.quantity >= 0 ? "text-success" : "text-error"}`}
                    >
                      {adj.quantity > 0 ? "+" : ""}
                      {adj.quantity} {adj.material.unit}
                    </td>
                    <td className="p-4 text-text-secondary">{adj.reason}</td>
                    <td className="p-4 text-text-muted text-xs">
                      {new Date(adj.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}