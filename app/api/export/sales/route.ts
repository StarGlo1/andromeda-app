import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET() {
  const sales = await prisma.sale.findMany({
    include: {
      customer: true,
      items: {
        include: {
          finishedGood: true,
        },
      },
    },
    orderBy: { saleDate: "desc" },
  });
  return NextResponse.json(sales);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerId, items, discount, tax, status, notes, totalAmount } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "At least one item is required" },
        { status: 400 }
      );
    }

    // Validate stock before creating sale
    for (const item of items) {
      const product = await prisma.finishedGood.findUnique({
        where: { id: item.productId },
      });
      if (!product) {
        return NextResponse.json(
          { error: `Product ${item.productId} not found` },
          { status: 404 }
        );
      }
      if (product.quantityOnHand < item.quantity) {
        return NextResponse.json(
          { error: `Not enough stock for "${product.name}". Available: ${product.quantityOnHand}` },
          { status: 400 }
        );
      }
    }

    // Create sale and deduct inventory in a transaction
    const sale = await prisma.$transaction(async (tx) => {
      // Create the sale
      const sale = await tx.sale.create({
        data: {
          customerId: customerId || null,
          discount: discount || 0,
          tax: tax || 0,
          status: status || "Paid",
          notes: notes || null,
          totalAmount: totalAmount || 0,
          items: {
            create: items.map((item: any) => ({
              finishedGoodId: item.productId,
              quantity: item.quantity,
              unitPrice: item.unitPrice,
              totalPrice: item.quantity * item.unitPrice,
            })),
          },
        },
        include: {
          items: true,
        },
      });

      // Deduct inventory
      for (const item of items) {
        await tx.finishedGood.update({
          where: { id: item.productId },
          data: {
            quantityOnHand: { decrement: item.quantity },
          },
        });
      }

      return sale;
    });

    revalidatePath("/sales");
    revalidatePath("/");

    return NextResponse.json(sale);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create sale" },
      { status: 500 }
    );
  }
}