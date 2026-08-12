import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const materials = await prisma.rawMaterial.findMany({
    select: { id: true, name: true, unit: true },
    orderBy: { name: "asc" },
  });
  return NextResponse.json({ materials });
}