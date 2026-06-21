import { skillSchema } from './schemas';
import fs from 'fs';
import path from 'path';

const CONTENT_DIR = path.join(process.cwd(), 'content');
const PROJECTS_DIR = path.join(CONTENT_DIR, 'projects');
const SKILLS_FILE = path.join(CONTENT_DIR, 'skills.json');

console.log('🔍 Validating content files...');

// Validate skills.json
if (fs.existsSync(SKILLS_FILE)) {
  try {
    const skillsContent = fs.readFileSync(SKILLS_FILE, 'utf-8');
    const skillsData = JSON.parse(skillsContent);
    skillSchema.array().parse(skillsData);
    console.log('✅ skills.json is valid');
  } catch (error) {
    console.error('❌ skills.json validation failed:', error);
    process.exit(1);
  }
} else {
  console.warn('⚠️  skills.json not found (will be created in Epic 4)');
}

// Validate project files
if (fs.existsSync(PROJECTS_DIR)) {
  const projectFiles = fs.readdirSync(PROJECTS_DIR);
  let hasErrors = false;

  for (const file of projectFiles) {
    if (file.endsWith('.mdx') || file.endsWith('.md')) {
      try {
        const filePath = path.join(PROJECTS_DIR, file);
        // Check file exists (full frontmatter validation in Epic 4)
        fs.readFileSync(filePath, 'utf-8');
        console.log(`✅ ${file} exists`);
      } catch (error) {
        console.error(`❌ ${file} validation failed:`, error);
        hasErrors = true;
      }
    }
  }

  if (hasErrors) {
    process.exit(1);
  }
} else {
  console.warn('⚠️  projects/ directory not found (will be created in Epic 4)');
}

console.log('✅ All content files validated successfully');
