## Future-Proofing Checklist

### Performance Targets
- [ ] Lighthouse Mobile ≥ 90 (CI enforced)
- [ ] Lighthouse Desktop ≥ 95
- [ ] 3G Fast load < 3 s (LCP ≤ 2.5 s)
- [ ] CLS < 0.1, INP < 200 ms, TTFB < 200 ms
- [ ] FloatingLines adaptive: 30/45/60 FPS tiers

### Responsiveness & UX
- [ ] Navigation usable at ≤ 360 px (hamburger with focus trap)
- [ ] Touch targets ≥ 44 px, `touch-action: manipulation`
- [ ] Fluid typography (`clamp`) for hero + section titles
- [ ] Portrait/landscape QA on iOS Safari + Android Chrome
- [ ] Swipe gestures + haptic feedback for modals/lists

### Mobile Readiness
- [ ] Responsive images (`srcset`, `sizes`, WebP/AVIF fallback)
- [ ] Lazy-load below-the-fold media / testimonials
- [ ] Service Worker offline shell + install prompt
- [ ] Connection-aware throttling (`navigator.connection`)
- [ ] PWA audit `lighthouse --preset=pwa`

### Accessibility & Compliance
- [ ] WCAG 2.2 AA (axe-core suite) – focus states, contrast, motion opt-out
- [ ] Skip links & reduced-motion fallbacks verified
- [ ] Live regions for nav/page transition status text
- [ ] GDPR-ready cookie consent + privacy link

### Scalability
- [ ] CDN caching headers for `/assets` (immutable + hashed)
- [ ] Next.js/SSR migration plan (routing + data fetching)
- [ ] Auto image optimization pipeline (Cloudinary/Vercel)
- [ ] Synthetic + RUM monitoring (Sentry/Datadog + Web Vitals)
- [ ] Quarterly performance + accessibility audits scheduled

### Tooling & Automation
- [ ] CI runs Lighthouse (desktop + mobile), Playwright (iPhone/Pixel)
- [ ] `scripts/lighthouse-mobile.mjs` for local baseline captures
- [ ] Bundle analyzer budget (< 250 kB JS after gzip)
- [ ] Feature flags / A/B harness for perf experiments
- [ ] Documentation kept current (this checklist updated per release)

