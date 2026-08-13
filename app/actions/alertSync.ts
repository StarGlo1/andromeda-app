"use server";

import { prisma } from "@/lib/prisma";

export async function syncAlerts() {
  // 1. Low stock materials
  const lowStockMaterials = await prisma.rawMaterial.findMany({
    where: {
      reorderThreshold: { not: null },
      totalQuantity: { lte: prisma.rawMaterial.fields.reorderThreshold },
    },
  });

  for (const material of lowStockMaterials) {
    const existing = await prisma.alert.findFirst({
      where: {
        type: "LOW_STOCK",
        referenceId: material.id,
        status: "active",
      },
    });
    if (!existing) {
      await prisma.alert.create({
        data: {
          type: "LOW_STOCK",
          title: `Low stock: ${material.name}`,
          description: `Only ${material.totalQuantity ?? 0} ${material.unit ?? ""} remaining (threshold: ${material.reorderThreshold} ${material.unit ?? ""})`,
          severity: material.totalQuantity && material.totalQuantity <= 0 ? "critical" : "warning",
          referenceId: material.id,
          referenceType: "material",
          status: "active",
        },
      });
    }
  }

  // 2. Negative stock materials
  const negativeStockMaterials = await prisma.rawMaterial.findMany({
    where: {
      totalQuantity: { lt: 0 },
    },
  });

  for (const material of negativeStockMaterials) {
    const existing = await prisma.alert.findFirst({
      where: {
        type: "NEGATIVE_STOCK",
        referenceId: material.id,
        status: "active",
      },
    });
    if (!existing) {
      await prisma.alert.create({
        data: {
          type: "NEGATIVE_STOCK",
          title: `Negative stock: ${material.name}`,
          description: `Stock is negative (${material.totalQuantity} ${material.unit ?? ""}). Please investigate.`,
          severity: "critical",
          referenceId: material.id,
          referenceType: "material",
          status: "active",
        },
      });
    }
  }

  // 3. Pending purchase orders
  const pendingPOs = await prisma.purchaseOrder.findMany({
    where: { status: "Pending" },
  });

  for (const po of pendingPOs) {
    const existing = await prisma.alert.findFirst({
      where: {
        type: "PENDING_PO",
        referenceId: po.id,
        status: "active",
      },
    });
    if (!existing) {
      await prisma.alert.create({
        data: {
          type: "PENDING_PO",
          title: `Pending purchase order: ${po.id}`,
          description: `PO from supplier ${po.supplierId} awaiting receipt.`,
          severity: "info",
          referenceId: po.id,
          referenceType: "purchaseOrder",
          status: "active",
        },
      });
    }
  }

  // 4. Overdue purchase orders
  const overduePOs = await prisma.purchaseOrder.findMany({
    where: {
      status: "Pending",
      expectedDate: { lt: new Date() },
    },
  });

  for (const po of overduePOs) {
    const existing = await prisma.alert.findFirst({
      where: {
        type: "OVERDUE_PO",
        referenceId: po.id,
        status: "active",
      },
    });
    if (!existing) {
      await prisma.alert.create({
        data: {
          type: "OVERDUE_PO",
          title: `Overdue purchase order: ${po.id}`,
          description: `Expected by ${po.expectedDate?.toISOString().slice(0,10)} but still pending.`,
          severity: "warning",
          referenceId: po.id,
          referenceType: "purchaseOrder",
          status: "active",
        },
      });
    }
  }

  // 5. Refunded sales
  const refundedSales = await prisma.sale.findMany({
    where: { status: "Refunded" },
  });

  for (const sale of refundedSales) {
    const existing = await prisma.alert.findFirst({
      where: {
        type: "REFUNDED_SALE",
        referenceId: sale.id,
        status: "active",
      },
    });
    if (!existing) {
      await prisma.alert.create({
        data: {
          type: "REFUNDED_SALE",
          title: `Refunded sale: ${sale.id}`,
          description: `Sale to customer ${sale.customerId ?? "unknown"} was refunded.`,
          severity: "warning",
          referenceId: sale.id,
          referenceType: "sale",
          status: "active",
        },
      });
    }
  }

  // 6. Unpaid sales (not Paid, not Refunded)
  const unpaidSales = await prisma.sale.findMany({
    where: {
      status: { notIn: ["Paid", "Refunded"] },
    },
  });

  for (const sale of unpaidSales) {
    const existing = await prisma.alert.findFirst({
      where: {
        type: "UNPAID_SALE",
        referenceId: sale.id,
        status: "active",
      },
    });
    if (!existing) {
      await prisma.alert.create({
        data: {
          type: "UNPAID_SALE",
          title: `Unpaid sale: ${sale.id}`,
          description: `Sale status is "${sale.status}".`,
          severity: "warning",
          referenceId: sale.id,
          referenceType: "sale",
          status: "active",
        },
      });
    }
  }

  return { success: true };
}