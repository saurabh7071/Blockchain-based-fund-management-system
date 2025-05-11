// app/superadmin/register/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMetamask } from "@/app/hooks/useMetamask"; // Adjust this path based on your project structure
import "./register.css"; // Register-specific styles (we will create this next)

export default function RegisterTemplePage() {
  const { account, isSuperAdmin } = useMetamask();
  const router = useRouter();
  const [showUnauthorized, setShowUnauthorized] = useState(false);

  const [formData, setFormData] = useState({
    templeName: "",
    authorityName: "",
    email: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (account && !isSuperAdmin) {
      setShowUnauthorized(true);
      const timer = setTimeout(() => {
        router.push("/"); // Redirect if not Super Admin
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [account, isSuperAdmin, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Perform form validation and submission (You can connect it to your backend)
    console.log("Form Submitted:", formData);
    alert("Temple Registered Successfully!");
  };

  return (
    <div className="register-container">
      {showUnauthorized ? (
        <p className="unauthorized">Unauthorized: You are not the Super Admin</p>
      ) : (
        <form className="register-form" onSubmit={handleSubmit}>
          <h2>Register a Temple</h2>
          <input
            type="text"
            name="templeName"
            placeholder="Temple Name"
            value={formData.templeName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="authorityName"
            placeholder="Temple Authority Name"
            value={formData.authorityName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Temple Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Temple Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
          <button type="submit" className="register-button">Register</button>
        </form>
      )}
    </div>
  );
}
