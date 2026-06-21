# Portfolio Platform

A production-quality personal portfolio platform built with Next.js, TypeScript, and Tailwind CSS. This project demonstrates modern web development practices with a focus on performance, accessibility, and maintainability.

## Features

- **Modern Stack**: Next.js 16 App Router with Server Components, TypeScript, Tailwind CSS
- **Performance**: Lighthouse 95+ scores across all categories (Performance, Accessibility, SEO, Best Practices)
- **Accessibility**: WCAG AA compliant with keyboard navigation, screen reader support, and reduced motion
- **SEO**: Complete metadata, sitemap, robots.txt, and structured data (Schema.org)
- **Content Management**: File-based content with MDX support and Zod validation
- **Contact Form**: Protected with honeypot, rate limiting, and email delivery via Resend
- **Dark Mode**: System-aware theme switching with `next-themes`

## Documentation

This project follows strict documentation governance. All development decisions are guided by:

- **AI_CONTEXT.md** - Highest authority, defines product vision and architecture rules
- **Engineering Standards Handbook** - Engineering philosophy and standards
- **11-implementation-blueprint-vFinal.md** - Authoritative execution plan for V1
- **04-srs.md** - Software Requirements Specification
- **06-system-architecture.md** - System architecture and data flow
- **07-frontend-architecture.md** - Frontend implementation patterns
- **08-design-system.md** - Token-and-primitive design system
- **09-coding-standards.md** - Coding standards and conventions
- **10-testing-strategy.md** - Testing pyramid and strategy
- **11-security-guidelines.md** - Security requirements and mechanisms
- **12-deployment-strategy.md** - Vercel deployment and CI pipeline
- **13-roadmap.md** - Project roadmap and epic breakdown
- **21-ai-engineering-handbook.md** - AI operating system and constraints

## Getting Started

### Prerequisites

- Node.js 20+
- npm (or yarn/pnpm)

### Installation

1. Clone the repository
2. Copy `.env.example` to `.env.local` and fill in the required values:
   ```bash
   cp .env.example .env.local
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### Environment Variables

See `.env.example` for the complete list of required environment variables:

- `NEXT_PUBLIC_SITE_URL` - Your production site URL
- `RESEND_API_KEY` - Resend API key for email service
- `RESEND_FROM_EMAIL` - Verified sender email
- `CONTACT_EMAIL_TO` - Destination email for contact form
- `UPSTASH_REDIS_REST_URL` - Upstash Redis URL for rate limiting
- `UPSTASH_REDIS_REST_TOKEN` - Upstash Redis token

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production (runs validate first)
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run type-check   # TypeScript strict mode check
npm run validate     # Validate content files against Zod schemas
npm run test:unit    # Run Vitest unit tests
npm run test:e2e     # Run Playwright E2E tests
npm run test:e2e:ui  # Run Playwright in UI mode (local debugging)
```

## Project Structure

```
├── app/                 # Next.js App Router pages
│   ├── about/          # About page
│   ├── contact/        # Contact page with form
│   ├── projects/       # Projects listing and detail pages
│   ├── resume/         # Resume download page
│   └── skills/         # Skills page
├── components/         # React components
│   ├── forms/          # Form components (ContactForm, HoneypotField)
│   ├── layout/         # Layout components (Navbar, Footer, ClientLayout)
│   ├── projects/       # Project-related components
│   ├── sections/       # Page sections (Hero, FeaturedProjects, SkillsPreview)
│   └── ui/             # UI primitives (ThemeProvider, ThemeToggle)
├── content/            # File-based content
│   ├── about.md        # About page content
│   ├── projects/       # Project MDX files
│   └── skills.json     # Skills data
├── lib/                # Utility functions and content loaders
│   └── content/        # Content validation and loading
├── services/           # External service integrations
├── tests/              # Test files
│   ├── e2e/            # Playwright E2E tests
│   └── unit/           # Vitest unit tests
└── types/              # TypeScript type definitions
```

## Architecture

- **Rendering Strategy**: Server Components by default, ISR for dynamic content
- **State Management**: Local `useState`/`useReducer` only (no global state)
- **Styling**: Tailwind CSS with design tokens (no raw hex values)
- **Validation**: Zod schemas for content and input validation
- **Testing**: E2E (Playwright) for critical paths, unit tests for lib/services
- **Deployment**: Vercel with GitHub Actions CI

## CI/CD

GitHub Actions workflows:

- **CI Pipeline** (`.github/workflows/ci.yml`): Runs on every PR
  - Lint
  - Type check
  - Content validation
  - Build
  - Unit tests
  - E2E tests

- **Lighthouse CI** (`.github/workflows/lighthouse.yml`): Runs on PRs touching app/components
  - Enforces 95+ scores on all categories
  - Budget checks for performance

## Deployment

This project is designed for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to `main`

Preview deployments are automatically created for every pull request.

## Contributing

This project follows strict governance rules. All changes must:

- Pass `npm run validate`, `npm run type-check`, `npm run lint`, `npm run build`
- Maintain Lighthouse 95+ scores
- Follow the design token system (no raw hex values)
- Use Server Components by default
- Include appropriate tests for new features

## License

[Your License Here]
