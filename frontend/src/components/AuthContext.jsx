import { createContext, useState } from "react";
import { ethers } from "ethers";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [account, setAccount] = useState(null);
  const [role, setRole] = useState(null);

  const connect = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const acc = await provider.send("eth_requestAccounts", []);
    setAccount(acc[0]);
  };

  return (
    <AuthContext.Provider value={{ account, role, setRole, connect }}>
      {children}
    </AuthContext.Provider>
  );
}