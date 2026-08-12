import Navbar from "@/app/components/Navbar";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <Navbar />
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Dashboard
          </h2>
          <p className="text-slate-500">
            Summary stats, charts, and alerts will appear here.
          </p>
        </div>
      </div>
    </main>
  );
}