import { z } from "zod";

export const AlumniCreate = z.object({
  name: z.string().min(2),
  batch: z.string().min(2),
  profession: z.string().min(2),
  location: z.string().optional(),
  skills: z.array(z.string()).optional(),
  linkedin: z.string().url().optional()
});

export const EventCreate = z.object({
  title: z.string().min(2),
  date: z.string().min(4),            // ISO string or yyyy-mm-dd
  mode: z.string().optional(),
  location: z.string().optional(),
  description: z.string().optional()
});

export const MentorshipApply = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  mentorId: z.string().min(1),
  message: z.string().optional()
});

export function validateBody(schema) {
  return (req, res, next) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (e) {
      return res.status(400).json({ error: e.errors?.[0]?.message || "Invalid input" });
    }
  };
}
