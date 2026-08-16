"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { isDemoModeActive } from "@/app/lib/demoMode";

export async function getCustomersAction() {
  const customers = await prisma.customer.findMany({
    select: { id: true, name: true, email: true, phone: true },
    orderBy: { name: "asc" },
  });
  return customers;
}

export async function getProductsAction() {
  const products = await prisma.finishedGood.findMany({
    select: { id: true, name: true, retailPrice: true, quantityOnHand: true },
    orderBy: { name: "asc" },
  });
  return products;
}

export async function createCustomerAction(
  name: string,
  email: string | null,
  phone: string | null,
  notes: string | null
) {
  if (!name || !name.trim()) {
    throw new Error("Customer name is required.");
  }

  // Check demo mode
  if (isDemoModeActive()) {
    return { id: "demo-customer", name: name.trim(), email, phone, notes };
  }

  const customer = await prisma.customer.create({
    data: {
      name: name.trim(),
      email: email || null,
      phone: phone || null,
      notes: notes || null,
    },
  });

  revalidatePath("/sales/new");
  revalidatePath("/customers");
  return customer;
}

export async function createSaleAction(data: {
  customerId: string | null;
  items: { productId: string; quantity: number; unitPrice: number }[];
  discount: number;
  tax: number;
  status: string;
  notes: string | null;
  totalAmount: number;
}) {
  if (!data.items || data.items.length === 0) {
    throw new Error("At least one product is required.");
  }

  // Check demo mode
  if (isDemoModeActive()) {
    return { id: "demo-sale", ...data };
  }

  const sale = await prisma.sale.create({
    data: {
      customerId: data.customerId,
      discount: data.discount,
      tax: data.tax,
      status: data.status,
      notes: data.notes,
      totalAmount: data.totalAmount,
      items: {
        create: data.items.map((item) => ({
          finishedGoodId: item.productId,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          totalPrice: item.quantity * item.unitPrice,
        })),
      },
    },
  });

  for (const item of data.items) {
    await prisma.finishedGood.update({
      where: { id: item.productId },
      data: {
        quantityOnHand: {
          decrement: item.quantity,
        },
      },
    });
  }

  revalidatePath("/sales");
  revalidatePath("/");
  return sale;
}