import { useEffect, useState } from "react";

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
        </div>
      ))}
    </div>
  );
}