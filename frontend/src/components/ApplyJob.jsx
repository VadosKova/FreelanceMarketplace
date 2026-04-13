export default function ApplyJob({ jobId, reload }) {
  const apply = async () => {
    const address = window.ethereum.selectedAddress;

    await fetch("http://localhost:5000/api/jobs/apply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        jobId,
        address
      })
    });

    reload();
  };

  return <button onClick={apply}>Apply</button>;
}