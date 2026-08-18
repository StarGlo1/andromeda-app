import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { PricingManager } from "./PricingManager";
import WhatIfTool from "@/app/components/WhatIfTool";

async function updatePriceAction(formData: FormData) {
  "use server";

  const id = String(formData.get("id") || "");
  const retailPrice = parseFloat(String(formData.get("retailPrice") || "0"));

  if (!id || retailPrice <= 0) {
    throw new Error("Valid product and price are required.");
  }

  await prisma.finishedGood.update({
    where: { id },
    data: { retailPrice },
  });

  revalidatePath("/pricing");
}

async function bulkUpdatePricesAction(formData: FormData) {
  "use server";

  const productIdsJson = String(formData.get("productIds") || "[]");
  const productIds = JSON.parse(productIdsJson);
  const marginPercent = parseFloat(String(formData.get("marginPercent") || "0"));

  if (!productIds || productIds.length === 0 || marginPercent <= 0) {
    throw new Error("Select products and enter a valid margin percentage.");
  }

  for (const id of productIds) {
    const product = await prisma.finishedGood.findUnique({
      where: { id },
    });

    if (product && product.calculatedCogs > 0) {
      const newPrice = product.calculatedCogs / (1 - marginPercent / 100);
      await prisma.finishedGood.update({
        where: { id },
        data: { retailPrice: Math.round(newPrice * 100) / 100 },
      });
    }
  }

  revalidatePath("/pricing");
}

export default async function PricingPage() {
  const products = await prisma.finishedGood.findMany({
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      batchCode: true,
      retailPrice: true,
      calculatedCogs: true,
      quantityOnHand: true,
      recipeItems: {
        select: {
          id: true,
          requiredQuantity: true,
          unit: true,
          rawMaterial: {
            select: { id: true, name: true, costPerUnit: true, unit: true },
          },
        },
      },
    },
  });

  const productsWithCogs = products.filter((p) => p.calculatedCogs > 0);
  const avgCogs = productsWithCogs.length > 0
    ? productsWithCogs.reduce((sum, p) => sum + p.calculatedCogs, 0) / productsWithCogs.length
    : 0;

  const avgPrice = products.length > 0
    ? products.reduce((sum, p) => sum + p.retailPrice, 0) / products.length
    : 0;

  const avgMargin = productsWithCogs.length > 0
    ? productsWithCogs.reduce((sum, p) => {
        const margin = p.retailPrice > 0 ? ((p.retailPrice - p.calculatedCogs) / p.retailPrice) * 100 : 0;
        return sum + margin;
      }, 0) / productsWithCogs.length
    : 0;

  const belowTarget = productsWithCogs.filter((p) => {
    const margin = p.retailPrice > 0 ? ((p.retailPrice - p.calculatedCogs) / p.retailPrice) * 100 : 0;
    return margin < 50;
  }).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mt-3">
          Pricing Dashboard
        </h1>
        <p className="mt-2 text-sm text-gray-900 dark:text-gray-100 max-w-3xl">
          Review your product pricing, profit margins, and adjust prices to hit your target margins.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-5 rounded-xl shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">AVG COGS</h3>
          <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
            ${avgCogs.toFixed(2)}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-5 rounded-xl shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">AVG RETAIL PRICE</h3>
          <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
            ${avgPrice.toFixed(2)}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-5 rounded-xl shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">AVG MARGIN</h3>
          <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
            {avgMargin.toFixed(1)}%
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-5 rounded-xl shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">BELOW 50% MARGIN</h3>
          <p className={`mt-2 text-2xl font-bold ${belowTarget > 0 ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"}`}>
            {belowTarget}
          </p>
        </div>
      </div>

      <PricingManager
        products={products}
        updatePriceAction={updatePriceAction}
        bulkUpdatePricesAction={bulkUpdatePricesAction}
      />

      <WhatIfTool products={products} />
    </div>
  );
}