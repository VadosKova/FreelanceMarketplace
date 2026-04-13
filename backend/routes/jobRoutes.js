import express from "express";
import { createJob, getJobs, applyJob, assignFreelancer } from "../controllers/jobController.js";

const router = express.Router();

router.post("/", createJob);
router.get("/", getJobs);
router.post("/apply", applyJob);
router.post("/assign", assignFreelancer);

export default router;