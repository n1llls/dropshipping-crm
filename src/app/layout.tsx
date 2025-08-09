import "./globals.css";
import { auth } from "@/lib/auth";
import Link from "next/link";

export const metadata = {
  title: "ToolMark CRM (Dropshipping)",
  description: "A modern, animated CRM for dropshipping"
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <div className="mx-auto max-w-7xl p-4">
          <header className="flex items-center justify-between py-4">
            <Link href="/" className="text-xl font-bold">Dropshipping CRM</Link>
            <nav className="space-x-4 text-sm">
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/products">Products</Link>
              <Link href="/orders">Orders</Link>
              <Link href="/stats">Stats</Link>
              {!session ? <Link href="/login">Login</Link> : <form action="/api/auth/signout" method="post"><button className="underline">Logout</button></form>}
            </nav>
          </header>
          <main>{children}</main>
          <footer className="text-xs text-white/60 py-8">© {new Date().getFullYear()} Dropshipping CRM</footer>
        </div>
      </body>
    </html>
  )
}
