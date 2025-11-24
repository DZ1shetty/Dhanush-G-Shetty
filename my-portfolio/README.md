# Dhanush G Shetty — Personal Portfolio

Modern React + Vite portfolio with Framer Motion micro-interactions, GPU-accelerated hero background, dynamic content sourced from `src/data.js`, and production-grade performance tooling.

## Tech Stack
- React 19 + Vite 7
- Tailwind CSS for layout + utility styles
- Framer Motion & custom Three.js shaders for interactions
- Sentry + Web Vitals instrumentation (opt-in via env vars)

## Getting Started
Requirements: Node.js 18+

```bash
npm install          # install dependencies
npm run dev          # start Vite dev server (localhost:5173)
npm run build        # create optimized dist/
npm run preview      # serve the production bundle locally
```

### Data-driven sections
Projects, journey timeline, certificates, etc. live inside `src/data.js`. Update the JSON-like structures to change UI content.

## Performance & Diagnostics
- **Smooth Mode toggle**: auto-enables on low-tier devices / Brave; manual override via header pill (preferences stored in `localStorage`).
- **Performance HUD**: enable with `VITE_SHOW_PERF_PANEL=true` (dev only) to see CLS/LCP/INP and long tasks in real time.
- **Sentry monitoring**: set `VITE_SENTRY_DSN` (and optional trace/replay sample rates) to receive runtime data.
- **Detailed playbook**: see `performance-optimization.md` for the full diagnostic guide, browser-specific tips, and scaling checklist.

## CI / Quality Gates
- `.github/workflows/performance-audit.yml` runs Lighthouse CI (`lighthouserc.json`) on every PR and push to `main`, targeting ≥90 performance/accessibility.

## Contact
- GitHub: [DZ1shetty](https://github.com/DZ1shetty)
- Email: [dhanushgshetty666@gmail.com](mailto:dhanushgshetty666@gmail.com)

MIT License. Contributions via issues/PRs are welcome—focus on incremental improvements and keep performance budgets in mind.

