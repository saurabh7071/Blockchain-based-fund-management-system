// app/page.tsx
"use client";
import LoginForm from "./superadmin/login/page";

export default function HomePage() {
  return (
    <div className="home-container">
        <button><LoginForm />Login</button>
    </div>
  );
}