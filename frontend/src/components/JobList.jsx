import { useEffect, useState } from "react";
import ApplyJob from "./ApplyJob";
import { releasePayment } from "../web3/contract";

export default function JobList({ refresh, account, reload }) {
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
            <ApplyJob jobId={job._id} reload={reload} />
          )}

          {job.client === account && job.applicants?.map((addr) => (
            <button
              key={addr}
              onClick={async () => {
                await fetch("http://localhost:5000/api/jobs/assign", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    jobId: job._id,
                    freelancer: addr
                  })
                });
                reload();
              }}
            >
              Assign {addr.slice(0,6)}
            </button>
          ))}

          {job.freelancer === account && job.status === "in_progress" && (
            <button
              onClick={async () => {
                const submission = prompt("Enter work link");

                await fetch("http://localhost:5000/api/jobs/submit", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    jobId: job._id,
                    submission
                  })
                });

                reload();
              }}
            >
              Submit Work
            </button>
          )}

          {job.client === account && job.status === "review" && (
            <>
              <p>Work: {job.submission}</p>

              <button onClick={() => releasePayment(job.contractJobId)}>
                Accept & Pay
              </button>

              <button
                onClick={async () => {
                  await fetch("http://localhost:5000/api/jobs/reject", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ jobId: job._id })
                  });
                  reload();
                }}
              >
                Reject
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}