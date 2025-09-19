import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { alumniQuerySchema } from "../utils/validate.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, "..", "data", "alumni.json");

function read() {
  return JSON.parse(fs.readFileSync(dataPath, "utf-8"));
}
function write(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

export function listAlumni(req, res) {
  const parse = alumniQuerySchema.safeParse(req.query);
  if (!parse.success) return res.status(400).json({ error: "Invalid query" });
  let { q, batch, profession, sort = "name", order = "asc", page = 1, limit = 20 } = parse.data;

  let data = read();

  if (q) {
    const s = q.toLowerCase();
    data = data.filter(a =>
      a.name.toLowerCase().includes(s) ||
      a.profession.toLowerCase().includes(s) ||
      (a.location || "").toLowerCase().includes(s) ||
      (a.skills || []).join(" ").toLowerCase().includes(s)
    );
  }
  if (batch) {
    data = data.filter(a => String(a.batch) === String(batch));
  }
  if (profession) {
    const p = profession.toLowerCase();
    data = data.filter(a => a.profession.toLowerCase().includes(p));
  }

  data.sort((a, b) => {
    const av = (a[sort] || "").toString().toLowerCase();
    const bv = (b[sort] || "").toString().toLowerCase();
    if (av < bv) return order === "asc" ? -1 : 1;
    if (av > bv) return order === "asc" ? 1 : -1;
    return 0;
  });

  const total = data.length;
  const start = (page - 1) * limit;
  const paged = data.slice(start, start + limit);

  res.json({ total, page, limit, data: paged });
}

export function getAlumni(req, res) {
  const data = read();
  const id = Number(req.params.id);
  const item = data.find(d => d.id === id);
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
}

export function addAlumni(req, res) {
  const body = req.body || {};
  const required = ["name", "batch", "profession"];
  for (const k of required) {
    if (!body[k]) return res.status(400).json({ error: `Missing field: ${k}` });
  }
  const data = read();
  const nextId = (data.at(-1)?.id || 0) + 1;
  const item = { id: nextId, ...body };
  data.push(item);
  write(data);
  res.status(201).json(item);
}
