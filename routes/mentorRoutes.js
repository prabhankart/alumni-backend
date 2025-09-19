import { Router } from "express";
import { listMentors, applyMentorship, mentorStats } from "../controllers/mentorController.js";
import { validateBody, MentorshipApply } from "../validate.js";

const r = Router();
r.get("/", listMentors);
r.get("/stats", mentorStats);
r.post("/apply", validateBody(MentorshipApply), applyMentorship);
export default r;
