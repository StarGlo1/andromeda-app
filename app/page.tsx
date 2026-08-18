import Link from 'next/link';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-transparent text-text">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-4 -mt-8 sm:-mt-10 pb-16">
        <div className="w-[22.5rem] h-[22.5rem] sm:w-[30rem] sm:h-[30rem] lg:w-[35rem] lg:h-[35rem] mb-8">
          <Image
            src="/images/andromeda-logo.png"
            alt="Andromeda Studios Logo"
            width={320}
            height={320}
            className="object-contain w-full h-full"
            priority
            unoptimized
          />
        </div>
        
        <h1 className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-bold tracking-[0.15em] sm:tracking-[0.25em] text-gray-900 dark:text-gray-100 leading-none -mt-7 sm:-mt-9">
          ANDROMEDA
        </h1>
        <p className="text-[1rem] sm:text-[1.25rem] lg:text-[1.5rem] font-medium tracking-[0.2em] sm:tracking-[0.3em] text-gray-600 dark:text-gray-300 mt-0.5 uppercase">
          Studios
        </p>
        
        <div className="mt-24 sm:mt-28 flex flex-col sm:flex-row gap-8 justify-center items-center">
          <Link
            href="/onboarding"
            className="bg-[#4f8792] hover:bg-[#426f79] text-white font-medium px-6 py-2.5 rounded-full transition-colors shadow-md text-center"
          >
            Create Your Studio
          </Link>
          <Link
            href="/dashboard"
            className="bg-surface border border-default text-text font-medium px-6 py-2.5 rounded-full hover:bg-brand-muted transition-colors text-center"
          >
            Access My Studio
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4 pt-2 sm:pt-3 pb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-surface-widget border border-default rounded-xl p-6 text-center">
          <span className="text-4xl">📦</span>
          <h3 className="mt-4 text-lg font-semibold text-text">Inventory</h3>
          <p className="mt-2 text-sm text-text-muted">
            Track raw materials, finished goods, and stock levels with ease.
          </p>
        </div>
        <div className="bg-surface-widget border border-default rounded-xl p-6 text-center">
          <span className="text-4xl">📝</span>
          <h3 className="mt-4 text-lg font-semibold text-text">Recipes & BOMs</h3>
          <p className="mt-2 text-sm text-text-muted">
            Manage formulas, batch costs, and production schedules.
          </p>
        </div>
        <div className="bg-surface-widget border border-default rounded-xl p-6 text-center">
          <span className="text-4xl">💰</span>
          <h3 className="mt-4 text-lg font-semibold text-text">Sales & Pricing</h3>
          <p className="mt-2 text-sm text-text-muted">
            Log sales, track customers, and calculate profitability.
          </p>
        </div>
        <div className="bg-surface-widget border border-default rounded-xl p-6 text-center">
          <span className="text-4xl">📊</span>
          <h3 className="mt-4 text-lg font-semibold text-text">Reports</h3>
          <p className="mt-2 text-sm text-text-muted">
            Understand your margins, COGS, and business performance.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-xl sm:text-2xl text-[#ede6dc]">
        <p>Inventory, production, and sales management built for small-batch makers. Track materials, recipes, and sales with confidence.</p>
      </footer>
    </main>
  );
}
