import { Router } from "express";
import { listMentors, addMentor, stats } from "../controllers/mentorController.js";
const router = Router();
router.get("/", listMentors);
router.post("/", addMentor);
router.get("/stats", stats);
export default router;
