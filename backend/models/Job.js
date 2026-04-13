import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: String,
  description: String,
  client: String,
  freelancer: String,
  amount: String,
  status: {
    type: String,
    default: "open"
  },
});

export default mongoose.model("Job", jobSchema);