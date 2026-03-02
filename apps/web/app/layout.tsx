import './globals.css';
import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="bg-white border-b">
          <div className="container flex gap-4">
            <Link href="/">Home</Link>
            <Link href="/quote">Request Quote</Link>
            <Link href="/admin/leads">Admin</Link>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
