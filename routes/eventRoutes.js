import { Router } from "express";
import { listEvents, addEvent } from "../controllers/eventController.js";
const router = Router();
router.get("/", listEvents);
router.post("/", addEvent);
export default router;
