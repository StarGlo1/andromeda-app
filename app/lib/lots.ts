import prisma from "@/lib/prisma";

export async function generateLotNumber(): Promise<string> {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const prefix = `LOT-${yyyy}${mm}${dd}-`;

  const count = await prisma.lot.count({
    where: {
      lotNumber: {
        startsWith: prefix,
      },
    },
  });

  const next = String(count + 1).padStart(2, "0");
  return `${prefix}${next}`;
}