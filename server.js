import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import alumniRoutes from "./routes/alumniRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import mentorRoutes from "./routes/mentorRoutes.js";

const app = express();

const allowed = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && allowed.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else {
    res.setHeader("Access-Control-Allow-Origin", "*");
  }
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/health", (_, res) => {
  res.json({ ok: true, service: "alumni-platform-backend" });
});

app.use("/api/alumni", alumniRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/mentors", mentorRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
