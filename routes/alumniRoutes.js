import { Router } from "express";
import { listAlumni, getAlumni, addAlumni } from "../controllers/alumniController.js";
const router = Router();
router.get("/", listAlumni);
router.get("/:id", getAlumni);
router.post("/", addAlumni);
export default router;
