import mongoose from "mongoose";

const MentorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    expertise: { type: [String], default: [] },
    slots: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Mentor", MentorSchema);
