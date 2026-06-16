import { skillSchema, type SkillData } from './schemas';
import fs from 'fs';
import path from 'path';

const CONTENT_FILE = path.join(process.cwd(), 'content', 'skills.json');

export async function getSkills(): Promise<SkillData[]> {
  try {
    const content = fs.readFileSync(CONTENT_FILE, 'utf-8');
    const parsed = JSON.parse(content);
    const validated = skillSchema.array().parse(parsed);
    return validated;
  } catch (error) {
    console.error('Error loading skills:', error);
    return [];
  }
}
