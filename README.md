# Portfolio OS

Retro pixel-desktop portfolio for a software engineer. Built with React, TypeScript, Vite, Tailwind CSS, and Framer Motion.

## Run locally

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Edit your content

Update `src/data/portfolio.ts`. That file holds your name, bio, skills, projects, experience, education, and links.

## Resume

Place a PDF at `public/resume.pdf`. Until that file exists, the resume buttons stay disabled.

## Contact form

The form uses a `mailto:` fallback until you set `contactFormEndpoint` in `src/data/portfolio.ts` (Formspree, EmailJS, or your own API).
