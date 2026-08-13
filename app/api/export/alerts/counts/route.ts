import { prisma } from "@/lib/prisma";

export async function GET() {
  const count = await prisma.alert.count({
    where: { status: "active" },
  });
  return new Response(JSON.stringify({ count }), {
    headers: { "Content-Type": "application/json" },
  });
}