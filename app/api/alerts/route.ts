import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const type = params.get("type");
  const status = params.get("status");
  const start = params.get("start");
  const end = params.get("end");

  const where: any = {};

  if (type && type !== "all") {
    where.type = type;
  }
  if (status && status !== "all") {
    where.status = status;
  }
  if (start || end) {
    where.createdAt = {};
    if (start) where.createdAt.gte = new Date(start);
    if (end) where.createdAt.lte = new Date(end);
  }

  const alerts = await prisma.alert.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  // Enrich alerts with material/category info for LOW_STOCK
  const enrichedAlerts = await Promise.all(
    alerts.map(async (alert) => {
      if (alert.type === "LOW_STOCK" && alert.referenceId) {
        const material = await prisma.rawMaterial.findUnique({
          where: { id: alert.referenceId },
          include: { category: { select: { name: true } } },
        });
        if (material) {
          return {
            ...alert,
            materialName: material.name,
            categoryName: material.category?.name || "",
            currentStock: material.totalQuantity,
            reorderThreshold: material.reorderThreshold,
          };
        }
      }
      return alert;
    })
  );

  return new Response(JSON.stringify(enrichedAlerts), {
    headers: { "Content-Type": "application/json" },
  });
}