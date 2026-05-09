import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    template: "%s — Daniel Fisher",
    default: "Daniel Fisher — Data Engineering & Geospatial",
  },
  description:
    "Data engineer specializing in geospatial data infrastructure and analytics.",
};

const navLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
  { href: "/cv", label: "CV" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-topo-slate antialiased">
        <header className="border-b border-stone-200">
          <nav className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link
              href="/"
              className="font-semibold text-topo-slate hover:text-topo-accent transition-colors"
            >
              Daniel Fisher
            </Link>
            <div className="flex gap-6">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm text-topo-muted hover:text-topo-slate transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </nav>
        </header>
        <main className="min-h-screen">{children}</main>
        <footer className="border-t border-stone-200 py-8 text-center text-sm text-topo-muted">
          <p>Daniel Fisher · Data Engineering &amp; Geospatial</p>
        </footer>
      </body>
    </html>
  );
}
