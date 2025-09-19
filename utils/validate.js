import { z } from "zod";

export const alumniQuerySchema = z.object({
  q: z.string().trim().optional(),
  batch: z.string().trim().optional(),
  profession: z.string().trim().optional(),
  sort: z.enum(["name","batch","profession"]).optional(),
  order: z.enum(["asc","desc"]).optional(),
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().optional()
});

export const eventBodySchema = z.object({
  title: z.string().min(2),
  date: z.string().min(4),
  venue: z.string().min(2),
  description: z.string().min(2)
});

export const mentorBodySchema = z.object({
  name: z.string().min(2),
  skills: z.array(z.string().min(1)).min(1),
  availability: z.string().min(2),
  contact: z.string().email()
});
