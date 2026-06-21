/**
 * CaseStudy Component
 * 
 * Per 18-component-specifications.md §3: Server Component that renders the full case study object.
 * Per SRS FR-005: Rich project deep-dive with problem, solution, architecture, challenges, outcomes.
 * Per Component Specifications: Composition of sub-sections with clear heading hierarchy.
 */

import type { Project } from '@/types/project';

interface CaseStudyProps {
  caseStudy: Project['caseStudy'];
}

export function CaseStudy({ caseStudy }: CaseStudyProps) {
  if (!caseStudy) {
    return null;
  }

  return (
    <div className="border-t border-border pt-8">
      <h2 className="text-2xl font-semibold text-foreground mb-4">
        Case Study
      </h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Problem
          </h3>
          <p className="text-muted-foreground">{caseStudy.problem}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Solution
          </h3>
          <p className="text-muted-foreground">{caseStudy.solution}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Architecture
          </h3>
          <p className="text-muted-foreground">{caseStudy.architecture}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Challenges
          </h3>
          <p className="text-muted-foreground">{caseStudy.challenges}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Outcomes
          </h3>
          <p className="text-muted-foreground">{caseStudy.outcomes}</p>
        </div>
      </div>
    </div>
  );
}
