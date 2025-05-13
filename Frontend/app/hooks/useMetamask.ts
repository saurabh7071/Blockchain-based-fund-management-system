// app/hooks/useMetamask.ts
"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";

export const useMetamask = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSuperAdmin, setIsSuperAdmin] = useState<boolean>(false);

  const SUPER_ADMIN_ADDRESS = "0x2973CCafB0A9b0439a80d082d9c5ACf254033dF7".toLowerCase(); // Super Admin Address

  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      const ethProvider = new ethers.BrowserProvider(window.ethereum);
      setProvider(ethProvider);
    } else {
      setError("MetaMask is not installed.");
    }
  }, []);

  const connectWallet = async () => {
    if (!provider) {
      setError("MetaMask is not connected.");
      return;
    }

    try {
      const accounts = await provider.send("eth_requestAccounts", []);
      const connectedAccount = accounts[0]?.toLowerCase();
      setAccount(connectedAccount);
      setIsSuperAdmin(connectedAccount === SUPER_ADMIN_ADDRESS);
    } catch (err) {
      setError("Failed to connect to MetaMask.");
    }
  };

  useEffect(() => {
    if (account) {
      setIsSuperAdmin(account === SUPER_ADMIN_ADDRESS);
    }
  }, [account]);

  return { account, connectWallet, error, isSuperAdmin };
};
