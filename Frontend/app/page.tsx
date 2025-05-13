// app/page.tsx
"use client";

import ConnectWallet from "@/app/components/ConnectWallet";

export default function HomePage() {
  return (
    <div className="home-container">
      <h1>Welcome to the Temple Fund Management System</h1>
      <p>
        Secure and decentralized fund management for temples.
        <br />
        Connect your wallet to start donating or managing funds.
      </p>
      <ConnectWallet />
    </div>
  );
}
