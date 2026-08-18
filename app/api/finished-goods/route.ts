import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const products = await prisma.finishedGood.findMany({
      select: {
        id: true,
        name: true,
        quantityOnHand: true,
        retailPrice: true,
        calculatedCogs: true,
      },
      orderBy: { name: "asc" },
    });

    return NextResponse.json({ products });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
