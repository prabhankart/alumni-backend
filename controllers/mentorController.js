import Mentor from "../models/Mentor.js";
import MentorshipApplication from "../models/MentorshipApplication.js";

export async function listMentors(_req, res) {
  try {
    const data = await Mentor.find({}).sort({ name: 1 });
    res.json(data);                     // ← return ARRAY only
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

export async function applyMentorship(req, res) {
  try {
    const mentor = await Mentor.findById(req.body.mentorId);
    if (!mentor) return res.status(404).json({ error: "Mentor not found" });

    await MentorshipApplication.create(req.body);
    res.json({ ok: true, message: "Applied successfully" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

// Used by Home page (this one SHOULD return an object)
export async function mentorStats(_req, res) {
  try {
    const totalMentors = await Mentor.countDocuments();
    const topAreas = await Mentor.aggregate([
      { $unwind: "$expertise" },
      { $group: { _id: "$expertise", c: { $sum: 1 } } },
      { $sort: { c: -1 } }, { $limit: 5 }
    ]);
    res.json({ totalMentors, topAreas });   // object is fine here
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
