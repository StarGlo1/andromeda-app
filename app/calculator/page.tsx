import { prisma } from "@/lib/prisma";
import CalculatorClient from "./CalculatorClient";

export default async function CalculatorPage() {
  const materials = await prisma.rawMaterial.findMany({
    where: {
      category: { name: { in: ["Fragrance Oil", "Fragrance Oils"] } },
    },
    select: { id: true, name: true, unit: true },
    orderBy: { name: "asc" },
  });

  return <CalculatorClient initialMaterials={materials} />;
}