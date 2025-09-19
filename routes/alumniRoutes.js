import { Router } from "express";
import { listAlumni, addAlumni } from "../controllers/alumniController.js";
import { validateBody, AlumniCreate } from "../validate.js";

const r = Router();
r.get("/", listAlumni);
r.post("/", validateBody(AlumniCreate), addAlumni);
export default r;
