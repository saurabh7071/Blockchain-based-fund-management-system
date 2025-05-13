// app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";
import Navbar from "./components/Navbar"; // Import the new Navbar

export const metadata = {
  title: "Temple Fund Management System",
  description: "A decentralized platform for managing temple funds securely.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="header">
          <Navbar />
        </header>
        <main className="main-content">{children}</main>
        <footer className="footer">
          <p>Temple Fund - Secure and Decentralized Fund Management</p>
        </footer>
      </body>
    </html>
  );
}
