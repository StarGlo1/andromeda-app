import { prisma } from "@/lib/prisma";
import Navbar from "@/app/components/Navbar";
import { RecipesTableClient } from "./RecipesTableClient";

export default async function RecipesPage() {
  const goods = await prisma.finishedGood.findMany({
    where: {
      recipeItems: { some: {} },
    },
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      calculatedCogs: true,
      createdAt: true,
      updatedAt: true,
      recipeItems: {
        select: {
          id: true,
          rawMaterial: { select: { name: true } },
        },
      },
    },
  });

  return (
    <main className="min-h-screen bg-bg text-text p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <Navbar />

        <div className="bg-surface-widget border border-default rounded-xl overflow-hidden">
          <div className="p-5 border-b border-default flex items-center justify-between">
            <h2 className="text-lg font-semibold text-text">Recipes</h2>
            <a
              href="/finished-goods"
              className="text-text-brand hover:underline text-sm font-medium"
            >
              Manage Products →
            </a>
          </div>

          {goods.length === 0 ? (
            <div className="text-center py-12 text-text-muted">
              No recipes yet. Create a finished good and add ingredients to get started.
            </div>
          ) : (
            // ✅ ADDED overflow wrapper around the table client component
            <div className="overflow-x-auto">
              <RecipesTableClient goods={goods} />
            </div>
          )}
        </div>

        <div className="text-center">
          <a
            href="/finished-goods"
            className="inline-flex items-center gap-2 bg-brand hover:bg-brand-hover text-white font-medium px-4 py-2 rounded-lg transition-colors text-sm"
          >
            + New Product
          </a>
        </div>
      </div>
    </main>
  );
}