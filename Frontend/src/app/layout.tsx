import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Digital Seva",
  description: "Decentralized Fund Management for Temples",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <header>

        </header>
        <main>{children}</main>

        <footer>
          <p>© 2023 Digital Seva. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
