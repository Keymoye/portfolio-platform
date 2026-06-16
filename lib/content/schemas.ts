import { z } from 'zod';

export const projectSchema = z.object({
  id: z.string(),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  description: z.string().min(1),
  techStack: z.array(z.string()).min(1),
  links: z.object({
    repo: z.string().url().optional(),
    live: z.string().url().optional(),
  }),
  images: z.array(z.string()).optional(),
  createdAt: z.string().datetime(),
  featured: z.boolean().optional(),
  caseStudy: z.object({
    problem: z.string(),
    solution: z.string(),
    architecture: z.string(),
    challenges: z.string(),
    outcomes: z.string(),
  }).optional(),
});

export const skillSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.enum(['Frontend', 'Backend', 'Tools', 'Architecture']),
  proficiency: z.number().min(1).max(5),
});

export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message too short').max(2000),
  honeypot: z.string().max(0),  // must be empty; SR-003
});

export type ProjectData = z.infer<typeof projectSchema>;
export type SkillData = z.infer<typeof skillSchema>;
