import mongoose from "mongoose";

const AlumniSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    batch: { type: String, required: true },      // keep string for easy filters
    profession: { type: String, required: true },
    location: String,
    skills: { type: [String], default: [] },
    linkedin: String
  },
  { timestamps: true }
);

export default mongoose.model("Alumni", AlumniSchema);
