// app/layout.tsx

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/app/components/Navbar';
import { ToastProvider } from '@/app/context/ToastContext';
import { DemoModeProvider } from '@/app/context/DemoModeContext';
import { LogoProvider } from '@/app/context/LogoContext';
import { getLogo } from '@/app/actions/getLogo';
import DemoModeBanner from '@/app/components/DemoModeBanner';
import '@/app/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Andromeda',
  description: 'Inventory and COGS calculator for small-batch makers',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const logoUrl = await getLogo();

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
          <LogoProvider initialLogoUrl={logoUrl}>
            <ToastProvider>
              <DemoModeBanner />
              <Navbar />
              <main className="pt-32 sm:pt-36 lg:pt-40">
                <div className="w-full px-0 sm:px-1 lg:px-2 pb-3">
                  <div className="workspace-container">
                    {children}
                  </div>
                </div>
              </main>
            </ToastProvider>
          </LogoProvider>
        </DemoModeProvider>
      </body>
    </html>
  );
}