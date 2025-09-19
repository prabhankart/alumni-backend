import Event from "../models/Event.js";

export async function listEvents(_req, res) {
  try {
    const data = await Event.find({}).sort({ date: 1 });
    res.json(data);                     // ← return ARRAY only
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

export async function addEvent(req, res) {
  try {
    const payload = { ...req.body, date: new Date(req.body.date) };
    const doc = await Event.create(payload);
    res.status(201).json(doc);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}
