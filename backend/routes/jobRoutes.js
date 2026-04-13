import express from "express";
import { createJob, getJobs, applyJob, assignFreelancer, submitWork, rejectJob } from "../controllers/jobController.js";

const router = express.Router();

router.post("/", createJob);
router.get("/", getJobs);
router.post("/apply", applyJob);
router.post("/assign", assignFreelancer);
router.post("/submit", submitWork);
router.post("/reject", rejectJob);

export default router;