import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const lots = await prisma.lot.findMany({
    where: { kind: "RAW_MATERIAL" },
    include: {
      rawMaterial: {
        select: { id: true, name: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ lots });
}