export interface Skill {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Tools' | 'Architecture';
  proficiency: number;         // 1–5
}
