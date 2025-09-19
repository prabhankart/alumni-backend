import Alumni from "../models/Alumni.js";

export async function listAlumni(req, res) {
  try {
    const { q = "", batch = "", profession = "" } = req.query;
    const query = {};
    if (q) {
      const rx = new RegExp(q, "i");
      query.$or = [{ name: rx }, { profession: rx }, { skills: rx }, { location: rx }];
    }
    if (batch) query.batch = batch;
    if (profession) query.profession = new RegExp(profession, "i");

    const data = await Alumni.find(query).sort({ createdAt: -1 });
    res.json(data);                     // ← return ARRAY only
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

export async function addAlumni(req, res) {
  try {
    const doc = await Alumni.create(req.body);
    res.status(201).json(doc);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}
