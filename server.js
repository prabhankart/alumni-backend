import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

import { connectDB } from "./db.js";
import alumniRoutes from "./routes/alumniRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import mentorRoutes from "./routes/mentorRoutes.js";
import Mentor from "./models/Mentor.js"; // for tiny seed (optional)

dotenv.config();

const app = express();

// CORS allowlist (local + Vercel)
const allowed = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    if (allowed.includes(origin)) return cb(null, true);
    // allow Vercel previews by wildcard (optional)
    if (/^https:\/\/.*vercel\.app$/.test(origin)) return cb(null, true);
    return cb(null, true); // or reject: cb(new Error("Not allowed"), false)
  },
  credentials: false
}));

app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/health", (_req, res) => res.json({ ok: true, service: "alumni-platform-backend" }));

app.use("/api/alumni", alumniRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/mentors", mentorRoutes);

const PORT = process.env.PORT || 5000;

await connectDB();

// tiny seed so Mentorship page shows data on first run
if (await Mentor.countDocuments() === 0) {
  await Mentor.insertMany([
    { name: "Neha Gupta", expertise: ["ML", "Data Science"], slots: 5 },
    { name: "Priya Singh", expertise: ["Cloud", "DevOps"], slots: 3 }
  ]);
}

app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
