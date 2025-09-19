import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { mentorBodySchema } from "../utils/validate.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, "..", "data", "mentors.json");

const read = () => JSON.parse(fs.readFileSync(dataPath, "utf-8"));
const write = (data) => fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

export function stats(_, res) {
  const alumni = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "data", "alumni.json"), "utf-8"));
  const events = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "data", "events.json"), "utf-8"));
  const mentors = read();
  res.json({
    alumniCount: alumni.length,
    eventCount: events.length,
    mentorCount: mentors.length,
    topMentors: mentors.sort((a,b)=> (b.sessions||0) - (a.sessions||0)).slice(0,3)
  });
}

export function listMentors(_, res) {
  res.json(read());
}

export function addMentor(req, res) {
  const parse = mentorBodySchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: "Invalid body" });
  const data = read();
  const nextId = (data.at(-1)?.id || 0) + 1;
  const item = { id: nextId, sessions: 0, ...parse.data };
  data.push(item);
  write(data);
  res.status(201).json(item);
}
