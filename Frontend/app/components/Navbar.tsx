// app/components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import '../globals.css';

export default function Navbar() {
  const pathname = usePathname(); // Get the current route path

  return (
    <nav className="navbar">
      <Link href="/">Home</Link>
      <Link href="/Templeadmin">Temple Admin</Link>

      {/* Conditionally show "Register a Temple" button for Super Admin route */}
      {pathname.startsWith("/superadmin") && (
        <Link href="/superadmin/register">
          <button className="nav-button">Register a Temple</button>
        </Link>
      )}
    </nav>
  );
}
