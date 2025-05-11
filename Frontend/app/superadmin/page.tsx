"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMetamask } from "@/app/hooks/useMetamask";

export default function SuperAdminPage() {
  const { account, connectWallet, isSuperAdmin } = useMetamask();
  const router = useRouter();
  const [showUnauthorized, setShowUnauthorized] = useState(false);

  useEffect(() => {
    if (!account) {
      connectWallet(); // Automatically connect MetaMask on page load
    }
  }, [account, connectWallet]);

  useEffect(() => {
    if (account && !isSuperAdmin) {
      setShowUnauthorized(true);
      const timer = setTimeout(() => {
        router.push("/"); // Redirect after 1 second
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [account, isSuperAdmin, router]);

  return (
    <div className="superadmin-container">
      <h2>Super Admin Dashboard</h2>
      <div className="wallet-connector">
        {account ? (
          <p>Connected: {account}</p>
        ) : (
          <button onClick={connectWallet} className="connect-button">
            Connect MetaMask
          </button>
        )}
      </div>

      {account ? (
        isSuperAdmin ? (
          <div>
            <p>Welcome, Super Admin!</p>
          </div>
        ) : showUnauthorized ? (
          <p className="unauthorized">Unauthorized: You are not the Super Admin</p>
        ) : (
          <p>Loading...</p>
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
