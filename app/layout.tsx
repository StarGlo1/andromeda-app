import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/app/components/Navbar';
import { ToastProvider } from '@/app/context/ToastContext';
import { DemoModeProvider } from '@/app/context/DemoModeContext';
import DemoModeBanner from '@/app/components/DemoModeBanner';
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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
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
            `,
          }}
        />
      </head>
      <body className={`${inter.className} bg-gray-50 dark:bg-black min-h-screen text-gray-900 dark:text-gray-100 antialiased`}>
        <DemoModeProvider>
          <ToastProvider>
            <DemoModeBanner />
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
              <div className="workspace-container">
                {children}
              </div>
            </main>
          </ToastProvider>
        </DemoModeProvider>
      </body>
    </html>
  );
}