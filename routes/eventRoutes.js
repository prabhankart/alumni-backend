import { Router } from "express";
import { listEvents, addEvent } from "../controllers/eventController.js";
import { validateBody, EventCreate } from "../validate.js";

const r = Router();
r.get("/", listEvents);
r.post("/", validateBody(EventCreate), addEvent);
export default r;
