import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import Navbar from '@/app/components/Navbar';
import { ToastProvider } from '@/app/context/ToastContext';
import '@/app/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Andromeda',
  description: 'Inventory and COGS calculator for small-batch makers',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-gray-50 dark:bg-gray-950 min-h-screen text-gray-900 dark:text-gray-100 antialiased`}
      >
        {/* This script loads the saved theme before the page renders */}
        <Script id="theme-init" strategy="beforeInteractive">
          {`
            (function() {
              try {
                const theme = localStorage.getItem('theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            })();
          `}
        </Script>

        <ToastProvider>
          <Navbar />
          {/* Add top padding so content doesn't hide behind fixed navbar */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
            {children}
          </main>
        </ToastProvider>
      </body>
    </html>
  );
}