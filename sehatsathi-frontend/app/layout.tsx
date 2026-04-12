import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MediBrain Platform",
  description: "Telemedicine Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="bg-slate-50 text-slate-900 min-h-full flex flex-col">
        {/* Global Navigation */}
        <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-extrabold tracking-tight text-blue-700">
              MediBrain
            </Link>
            <div className="flex gap-8 font-semibold text-gray-600">
              <Link href="/" className="hover:text-blue-600 transition">Find Doctors</Link>
              <Link href="/hospitals" className="hover:text-blue-600 transition">Find Hospitals</Link>
            </div>
          </div>
        </nav>
        
        {/* Page Content */}
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
