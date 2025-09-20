// routes/devRoutes.js
import { Router } from "express";
import { seedAll, resetAll } from "../utils/seed.js";

const r = Router();

r.post("/seed", async (_req, res) => {
  try {
    const inserted = await seedAll();
    res.json({ ok: true, inserted });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

r.post("/reset", async (_req, res) => {
  try {
    await resetAll();
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default r;
