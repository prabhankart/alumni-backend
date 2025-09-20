// utils/seed.js
import Alumni from "../models/Alumni.js";
import Event from "../models/Event.js";
import Mentor from "../models/Mentor.js";

const DEMO_ALUMNI = [
  { name: "Aarav Sharma",  batch: "2016", profession: "Software Engineer", location: "Bengaluru", skills: ["React","Node.js"], linkedin: "https://linkedin.com" },
  { name: "Neha Gupta",    batch: "2018", profession: "Data Scientist",    location: "Pune",       skills: ["Python","ML"],      linkedin: "https://linkedin.com" },
  { name: "Rahul Verma",   batch: "2015", profession: "Product Manager",   location: "Gurugram",   skills: ["Roadmaps","Analytics"] },
  { name: "Priya Singh",   batch: "2017", profession: "Cloud Architect",   location: "Hyderabad",  skills: ["AWS","GCP"] },
  { name: "Ishan Patel",   batch: "2019", profession: "DevOps Engineer",   location: "Ahmedabad",  skills: ["Docker","Kubernetes"] },
  { name: "Ananya Rao",    batch: "2014", profession: "UI/UX Designer",    location: "Mumbai",     skills: ["Figma","Design Systems"] }
];

const DEMO_EVENTS = [
  { title: "Alumni Meet 2025",  date: new Date("2025-12-10"), mode: "Offline", location: "Campus Auditorium", description: "Annual alumni networking meet." },
  { title: "Mentorship Webinar",date: new Date("2025-12-15"), mode: "Online",  location: "Zoom",              description: "Career guidance by alumni mentors." },
  { title: "Tech Careers AMA",  date: new Date("2026-01-10"), mode: "Hybrid",  location: "Seminar Hall / Meet", description: "Open Q&A with senior alumni." }
];

const DEMO_MENTORS = [
  { name: "Neha Gupta", expertise: ["ML","Data Science"], slots: 5 },
  { name: "Priya Singh", expertise: ["Cloud","DevOps"],   slots: 3 }
];

export async function seedAll() {
  const inserted = { alumni: 0, events: 0, mentors: 0 };

  if (await Alumni.countDocuments() === 0) {
    await Alumni.insertMany(DEMO_ALUMNI);
    inserted.alumni = DEMO_ALUMNI.length;
  }
  if (await Event.countDocuments() === 0) {
    await Event.insertMany(DEMO_EVENTS);
    inserted.events = DEMO_EVENTS.length;
  }
  if (await Mentor.countDocuments() === 0) {
    await Mentor.insertMany(DEMO_MENTORS);
    inserted.mentors = DEMO_MENTORS.length;
  }
  return inserted;
}

export async function resetAll() {
  await Promise.all([Alumni.deleteMany({}), Event.deleteMany({}), Mentor.deleteMany({})]);
}
