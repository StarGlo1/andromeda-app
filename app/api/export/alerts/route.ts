import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const status = searchParams.get("status");
  const start = searchParams.get("start");
  const end = searchParams.get("end");

  const where: any = {};
  if (type && type !== "all") where.type = type;
  if (status && status !== "all") where.status = status;
  if (start || end) {
    where.createdAt = {};
    if (start) where.createdAt.gte = new Date(start);
    if (end) where.createdAt.lte = new Date(end);
  }

  const alerts = await prisma.alert.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return new Response(JSON.stringify(alerts), {
    headers: { "Content-Type": "application/json" },
  });
}