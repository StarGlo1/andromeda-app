import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const barcode = request.nextUrl.searchParams.get("code")?.trim() || "";

  if (!barcode) {
    return NextResponse.json({ found: false, message: "No code provided" });
  }

  // Check materials first
  const material = await prisma.rawMaterial.findFirst({
    where: { barcode },
    select: { id: true, name: true, totalQuantity: true, unit: true },
  });

  if (material) {
    return NextResponse.json({
      found: true,
      type: "material",
      item: material,
    });
  }

  // Check finished goods by SKU
  const product = await prisma.finishedGood.findFirst({
    where: { sku: barcode },
    select: { id: true, name: true, quantityOnHand: true, retailPrice: true },
  });

  if (product) {
    return NextResponse.json({
      found: true,
      type: "product",
      item: product,
    });
  }

  return NextResponse.json({
    found: false,
    message: `No item found with code: ${barcode}`,
  });
}
