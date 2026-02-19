import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hunter's Ascent | Shadow System",
  description: "Awaken your potential. Become the ultimate Hunter.",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/icon-192.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background bg-grid bg-radial-glow">
        <div className="relative min-h-screen">
          {/* Ambient glow effects */}
          <div className="fixed top-0 left-1/4 w-96 h-96 bg-neon-blue/5 rounded-full blur-3xl pointer-events-none" />
          <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl pointer-events-none" />
          
          {/* Main content */}
          <main className="relative z-10">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
