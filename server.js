// server.js
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

import { connectDB } from "./db.js";
import alumniRoutes from "./routes/alumniRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import mentorRoutes from "./routes/mentorRoutes.js";

import devRoutes from "./routes/devRoutes.js";     // POST /api/dev/seed, /api/dev/reset
import { seedAll } from "./utils/seed.js";         // demo data seeder

dotenv.config();

const app = express();

// --- CORS allowlist (local + Vercel) ---
const allowed = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  process.env.FRONTEND_URL, // e.g. https://your-frontend.vercel.app
].filter(Boolean);

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);
      if (allowed.includes(origin)) return cb(null, true);
      // allow Vercel preview deploys like https://*.vercel.app
      if (/^https:\/\/.*\.vercel\.app$/.test(origin)) return cb(null, true);
      return cb(null, true); // relax CORS in demo; tighten if needed
    },
    credentials: false,
  })
);

app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

// Dev/utility routes (seed/reset) — enable only when allowed
if (process.env.ALLOW_DEV === "true") {
  app.use("/api/dev", devRoutes);
  console.log("✅ Dev routes enabled at /api/dev (seed/reset)");
}

// Health check
app.get("/api/health", (_req, res) =>
  res.json({ ok: true, service: "alumni-platform-backend" })
);

// API routes
app.use("/api/alumni", alumniRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/mentors", mentorRoutes);

const PORT = process.env.PORT || 5000;

// Connect DB then (optionally) seed, then start server
await connectDB();

if (process.env.SEED_ON_START === "true") {
  const inserted = await seedAll();
  console.log("🌱 Seed on start:", inserted);
}

app.listen(PORT, () =>
  console.log(`Backend running on http://localhost:${PORT}`)
);
