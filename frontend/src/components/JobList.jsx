import { useEffect, useState } from "react";
import ApplyJob from "./ApplyJob";

export default function JobList({ refresh }) {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/jobs")
      .then((res) => res.json())
      .then(setJobs);
  }, [refresh]);

  return (
    <div className="card">
      <h2>Jobs</h2>

      {jobs.map((job) => (
        <div key={job._id}>
          <p><b>{job.title}</b></p>
          <p>{job.amount} ETH</p>
          <p>Status: {job.status}</p>

          {job.status === "open" && (
            <ApplyJob jobId={job._id} />
          )}
        </div>
      ))}

      {job.applicants?.map((addr) => (
        <button
          key={addr}
          onClick={async () => {
            await fetch("http://localhost:5000/api/jobs/assign", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                jobId: job._id,
                freelancer: addr
              })
            });
          }}
        >
          Assign {addr.slice(0, 6)}
        </button>
      ))}
    </div>
  );
}