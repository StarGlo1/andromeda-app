import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ToastProvider } from "@/app/context/ToastContext";

export const metadata: Metadata = {
  title: "ANDROMEDA",
  description: "One system. Infinite crafts. Exact margins.",
};

export const viewport: Viewport = {
  colorScheme: "light dark",
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
            __html: `(function() {
              try {
                var stored = localStorage.getItem('theme');
                if (stored === 'light') {
                  document.documentElement.classList.remove('dark');
                } else {
                  document.documentElement.classList.add('dark');
                }
              } catch(e) {}
            })();`,
          }}
        />
      </head>
      <body className="bg-bg text-text antialiased min-h-screen">
        <ToastProvider>
          <main className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </main>
        </ToastProvider>
      </body>
    </html>
  );
}