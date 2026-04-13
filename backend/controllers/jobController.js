import Job from "../models/Job.js";

export const createJob = async (req, res) => {
  const job = await Job.create(req.body);
  res.json(job);
};

export const getJobs = async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
};

export const applyJob = async (req, res) => {
  const { jobId, address } = req.body;

  const job = await Job.findById(jobId);
  job.applicants.push(address);
  await job.save();

  res.json(job);
};