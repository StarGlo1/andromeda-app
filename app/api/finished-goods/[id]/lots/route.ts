import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const lots = await prisma.lot.findMany({
    where: {
      finishedGoodId: id,
      kind: "FINISHED_GOOD",
    },
    include: {
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
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ lots });
}