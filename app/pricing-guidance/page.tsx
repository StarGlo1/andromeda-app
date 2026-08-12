import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";

export default async function PricingGuidancePage() {
  const products = await prisma.finishedGood.findMany({
    where: { isSubAssembly: false },
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      retailPrice: true,
      calculatedCogs: true,
    },
  });

  const formatPrice = (price: number | null) => {
    if (price === null || price === undefined) return "—";
    return `$${price.toFixed(2)}`;
  };

  const calculateSuggested = (cogs: number | null, multiplier: number) => {
    if (!cogs || cogs <= 0) return null;
    return cogs * multiplier;
  };

  return (
    <main className="min-h-screen bg-bg text-text p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <Navbar />

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-text">💰 Pricing Guidance</h1>
            <p className="text-text-muted text-sm">
              Suggested retail and wholesale prices based on COGS
            </p>
          </div>
          <Link
            href="/finished-goods"
            className="text-text-brand hover:underline text-sm"
          >
            ← Back to Products
          </Link>
        </div>

        <div className="bg-surface-widget border border-default rounded-xl overflow-hidden">
          {products.length === 0 ? (
            <div className="text-center py-12 text-text-muted">
              No products yet. Create a product first to see pricing guidance.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-default bg-surface-widget text-text-muted text-xs uppercase tracking-wider">
                    <th className="p-4">Product</th>
                    <th className="p-4 text-right">COGS</th>
                    <th className="p-4 text-right">Current Retail</th>
                    <th className="p-4 text-right">Suggested Wholesale (2×)</th>
                    <th className="p-4 text-right">Suggested Retail (4×)</th>
                    <th className="p-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-default text-sm">
                  {products.map((product) => {
                    const cogs = product.calculatedCogs ?? 0;
                    const suggestedWholesale = calculateSuggested(cogs, 2);
                    const suggestedRetail = calculateSuggested(cogs, 4);
                    const currentRetail = product.retailPrice || 0;

                    return (
                      <tr key={product.id} className="hover:bg-brand-muted dark:hover:bg-brand-muted-dark transition-colors">
                        <td className="p-4 font-medium text-text">{product.name}</td>
                        <td className="p-4 text-right font-medium text-warning">
                          {formatPrice(cogs)}
                        </td>
                        <td className="p-4 text-right text-text-secondary">
                          {formatPrice(currentRetail)}
                          {currentRetail > 0 && cogs > 0 && (
                            <span className="text-text-muted text-xs ml-1">
                              ({((currentRetail - cogs) / currentRetail * 100).toFixed(1)}%)
                            </span>
                          )}
                        </td>
                        <td className="p-4 text-right font-medium text-text">
                          {suggestedWholesale !== null ? formatPrice(suggestedWholesale) : "—"}
                        </td>
                        <td className="p-4 text-right font-bold text-text-brand">
                          {suggestedRetail !== null ? formatPrice(suggestedRetail) : "—"}
                        </td>
                        <td className="p-4 text-center">
                          <Link
                            href={`/finished-goods/${product.id}/recipe`}
                            className="text-text-brand hover:underline text-xs font-medium"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Helpful note */}
        <div className="bg-surface-widget border border-default rounded-xl p-6">
          <h2 className="text-lg font-semibold text-text mb-2">📖 How to use this page</h2>
          <ul className="space-y-2 text-text-muted text-sm">
            <li>• <strong className="text-text">COGS</strong> – Your total cost per unit (raw materials + labor + overhead)</li>
            <li>• <strong className="text-text">Current Retail</strong> – What you're currently selling for, with margin %</li>
            <li>• <strong className="text-text">Suggested Wholesale (2×)</strong> – Standard wholesale pricing for bulk orders</li>
            <li>• <strong className="text-text">Suggested Retail (4×)</strong> – Standard retail pricing for direct sales</li>
            <li>• <strong className="text-text">Pro tip</strong> – Adjust your product's retail price directly on the product page using the edit button or the 💰 pricing modal.</li>
          </ul>
        </div>

        <div className="text-center">
          <Link
            href="/finished-goods"
            className="text-text-muted hover:text-text text-sm"
          >
            ← Back to Products
          </Link>
        </div>
      </div>
    </main>
  );
}