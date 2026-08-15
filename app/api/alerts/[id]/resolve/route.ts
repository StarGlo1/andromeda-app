import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const alert = await prisma.alert.update({
    where: { id },
    data: { status: "resolved" },
  });

  return new Response(JSON.stringify(alert), {
    headers: { "Content-Type": "application/json" },
  });
}