"use server";

import { prisma } from "@/lib/prisma";

// 1. Export Sales & Revenue
export async function exportSalesCSV() {
  const sales = await prisma.saleTransaction.orderBy({ date: "desc" });
  const headers = ["transaction_id", "date", "channel", "gross_amount", "discounts", "shipping_charged", "refunds_amount", "net_revenue"];
  
  const rows = sales.map((s) => [
    s.transactionId,
    s.date.toISOString().split("T")[0],
    `"${s.channel}"`,
    s.grossAmount,
    s.discounts,
    s.shippingCharged,
    s.refundsAmount,
    s.netRevenue,
  ]);

  return [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
}

// 2. Export Raw Material Purchases
export async function exportPurchasesCSV() {
  const purchases = await prisma.purchaseLog.orderBy({ purchaseDate: "desc" });
  const headers = ["purchase_date", "item_name", "category", "supplier", "quantity_purchased", "unit", "cost_per_unit", "total_cost"];
  
  const rows = purchases.map((p) => [
    p.purchaseDate.toISOString().split("T")[0],
    `"${p.itemName}"`,
    `"${p.category}"`,
    `"${p.supplierName}"`,
    p.quantityPurchased,
    p.unit,
    p.costPerUnit,
    p.totalCost,
  ]);

  return [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
}

// 3. Export Operating Expenses
export async function exportExpensesCSV() {
  const expenses = await prisma.operatingExpense.orderBy({ expenseDate: "desc" });
  const headers = ["expense_date", "vendor", "category_tag", "amount", "receipt_reference"];
  
  const rows = expenses.map((e) => [
    e.expenseDate.toISOString().split("T")[0],
    `"${e.vendor}"`,
    `"${e.categoryTag}"`,
    e.amount,
    `"${e.receiptReference || ""}"`,
  ]);

  return [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
}

// 4. Export Production Batches & COGS
export async function exportBatchesCSV() {
  const batches = await prisma.productionBatchLedger.orderBy({ createdAt: "desc" });
  const headers = ["batch_id", "product_line", "quantity_produced", "total_raw_material_cost", "unit_cogs"];
  
  const rows = batches.map((b) => [
    b.batchId,
    `"${b.productLine}"`,
    b.quantityProduced,
    b.totalRawMaterialCost,
    b.unitCogs,
  ]);

  return [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
}