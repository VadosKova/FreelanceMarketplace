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

export const assignFreelancer = async (req, res) => {
  const { jobId, freelancer } = req.body;

  const job = await Job.findById(jobId);
  job.freelancer = freelancer;
  job.status = "in_progress";

  await job.save();

  res.json(job);
};

export const submitWork = async (req, res) => {
  const { jobId, submission } = req.body;

  const job = await Job.findById(jobId);

  job.submission = submission;
  job.status = "review";

  await job.save();

  res.json(job);
};

export const rejectJob = async (req, res) => {
  const { jobId } = req.body;

  const job = await Job.findById(jobId);

  job.status = "rejected";

  await job.save();

  res.json(job);
};