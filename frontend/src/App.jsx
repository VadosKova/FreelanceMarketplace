import { useState, useEffect, useContext } from 'react'
import CreateJob from "../components/CreateJob";
import JobList from "../components/JobList";
import AuthProvider, { AuthContext } from "./context/AuthContext";
import { getBalance } from "./web3/contract";
import './App.css'

function MainApp() {
  const { account, connect, role, setRole } = useContext(AuthContext);
  const [refresh, setRefresh] = useState(false);
  const [balance, setBalance] = useState("");

  useEffect(() => {
    if (account) {
      getBalance(account).then(setBalance);
    }
  }, [account]);

  if (!account) {
    return <button onClick={connect}>Connect Wallet</button>;
  }

  if (!role) {
    return (
      <div>
        <button onClick={() => setRole("client")}>Client</button>
        <button onClick={() => setRole("freelancer")}>Freelancer</button>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Web3 Freelance</h1>
      <p>Balance: {balance} ETH</p>

      {role === "client" && (
        <CreateJob reload={() => setRefresh(!refresh)} account={account} />
      )}

      <JobList
        refresh={refresh}
        account={account}
        reload={() => setRefresh(!refresh)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}