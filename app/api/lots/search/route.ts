import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim() || "";

  if (!q) {
    return NextResponse.json({ results: [] });
  }

  const lots = await prisma.lot.findMany({
    where: {
      lotNumber: {
        contains: q,
      },
    },
    include: {
      rawMaterial: {
        select: { id: true, name: true },
      },
      finishedGood: {
        select: { id: true, name: true },
      },
      rawMaterialLinks: {
        include: {
          rawMaterialLot: {
            include: {
              rawMaterial: {
                select: { id: true, name: true },
              },
            },
          },
        },
      },
      finishedGoodLinks: {
        include: {
          finishedGoodLot: {
            include: {
              finishedGood: {
                select: { id: true, name: true },
              },
            },
          },
        },
      },
    },
    take: 20,
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ results: lots });
}