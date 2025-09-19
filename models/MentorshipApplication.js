import mongoose from "mongoose";

const MentorshipApplicationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    mentorId: { type: mongoose.Schema.Types.ObjectId, ref: "Mentor", required: true },
    message: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.model("MentorshipApplication", MentorshipApplicationSchema);
