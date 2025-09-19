import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    date: { type: Date, required: true },
    mode: { type: String, default: "Online" },
    location: { type: String, default: "" },
    description: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.model("Event", EventSchema);
