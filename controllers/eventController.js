import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { eventBodySchema } from "../utils/validate.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, "..", "data", "events.json");

const read = () => JSON.parse(fs.readFileSync(dataPath, "utf-8"));
const write = (data) => fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

export function listEvents(_, res) {
  res.json(read());
}

export function addEvent(req, res) {
  const parse = eventBodySchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: "Invalid body" });
  const data = read();
  const nextId = (data.at(-1)?.id || 0) + 1;
  const item = { id: nextId, ...parse.data };
  data.push(item);
  write(data);
  res.status(201).json(item);
}
