import { prisma } from "@/lib/prisma";

export default async function ProductionHistoryPage() {
  const productionLots = await prisma.lot.findMany({
    where: { kind: "FINISHED_GOOD" },
    orderBy: { createdAt: "desc" },
    include: {
      finishedGood: {
        select: { id: true, name: true, batchCode: true },
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
    },
  });

  return (
    <main className="min-h-screen bg-transparent text-text p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-text mt-3">Production History</h1>
        <p className="text-text-muted text-sm">
          Every batch you&apos;ve produced, with the material lots used.
        </p>

        {productionLots.length === 0 ? (
          <div className="text-center py-12 text-text-muted">
            No production batches yet. Produce a batch to see it here.
          </div>
        ) : (
          <div className="space-y-4">
            {productionLots.map((lot) => (
              <div key={lot.id} className="bg-surface-widget border border-default rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-text">
                      {lot.finishedGood?.name ?? "Unknown Product"}
                    </h3>
                    <p className="text-xs text-text-muted">
                      Lot: {lot.lotNumber} | Batch: {lot.finishedGood?.batchCode ?? "—"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-text">{lot.quantity ?? 0} units</p>
                    <p className="text-xs text-text-muted">
                      {new Date(lot.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-text-muted">
                      {new Date(lot.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>

                {lot.rawMaterialLinks.length > 0 && (
                  <div className="border-t border-default pt-3">
                    <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-2">
                      Material Lots Used
                    </p>
                    <div className="space-y-1">
                      {lot.rawMaterialLinks.map((link) => (
                        <div key={link.id} className="flex justify-between text-sm">
                          <span className="text-text">
                            {link.rawMaterialLot.rawMaterial?.name ?? "Unknown"}
                          </span>
                          <span className="text-text-muted">
                            Lot: {link.rawMaterialLot.lotNumber} | Used: {link.quantityUsed}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
