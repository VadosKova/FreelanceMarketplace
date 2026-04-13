import { useState } from "react";
import { createJobOnChain } from "../web3/contract";

export default function CreateJob({ reload, account }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const handleCreate = async () => {
    const contractJobId = await createJobOnChain(account, amount);

    await fetch("http://localhost:5000/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        amount,
        client: account,
        contractJobId
      })
    });

    reload();
  };

  return (
    <div className="card">
      <h2>Create Job</h2>
      <input placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
      <input placeholder="ETH" onChange={(e) => setAmount(e.target.value)} />
      <button onClick={handleCreate}>Create</button>
    </div>
  );
}