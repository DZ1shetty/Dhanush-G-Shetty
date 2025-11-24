# Performance Optimization Playbook

## 1. Observable Symptoms
- **VSCode Live Server (static dist)** felt smooth because it served minified assets with no dev-only overlays or service workers.
- **Brave/Chrome dev server** saw 5–10× slower paints: GPU background (Three.js shader), React StrictMode double renders, and a dev-only service worker fighting Vite’s module loader caused long tasks and stutters.
- **High CPU + jank** emerged mostly on hardware-accelerated browsers when Brave shields toggled GPU/JS policies or when hardware concurrency ≤4 cores.

## 2. Root-Cause Matrix
| Layer | Issue | Impact | Mitigation |
| --- | --- | --- | --- |
| Browser | Brave blocks GPU / toggles hardware accel; shields delay module fetches | Shader background + parallax starved main thread | Auto “Smooth Mode”, GPU-safe fallback, Perf HUD |
| Localhost server | Dev SW cached `/src` files & conflicted with Vite HMR | Reload loops + stale modules | Register SW only in production, lean SW cache |
| Code/Assets | FloatingLines rendered at 60fps WebGL regardless of tier; large vendor chunk JSON | CPU spikes on low-tier devices | 30fps throttle, pixel ratio caps, compression |
| Hardware | Low core / low memory devices, Save-Data, reduced-motion | Input latency & animation jank | Device tier detector funnels to smooth mode |

## 3. Diagnostic Workflow (Step-by-Step)
1. **Baseline**: `npm run build && npm run preview`; open Chrome + Brave; record Lighthouse + Performance tab timeline.
2. **Compare**: toggle Smooth Mode (`Full FX` pill) and note FPS/CPU in DevTools overlay; watch Performance HUD overlay (enable via `VITE_SHOW_PERF_PANEL=true`).
3. **Browser quirks**: In Brave, disable shields for localhost, flip `Use hardware acceleration` (Settings → System) and note GPU column in Chrome’s task manager.
4. **Server isolation**: Serve `dist/` via `npx serve dist`, `python -m http.server`, or `npm run preview` to rule out Express/Nginx misconfigs.
5. **Heap + leaks**: Use Memory tab → Record Allocation timeline during hero animations; ensure no unbounded listeners (preloader + modal cleanups already handled).
6. **Network**: Performance tab waterfalls vs Live Server; confirm no SW hits (Application → Service Workers) during dev.

## 4. Fixes Implemented (code refs)
- **GPU-aware background**: `FloatingLines` now caps pixel ratio & FPS by device tier and Brave detection (see `src/components/FloatingLines.jsx`).
- **Auto Smooth Mode**: `useDeviceTier` + `usePerformanceDiagnostics` infer Save-Data / reduced-motion, automatically falling back without user toggle (`src/hooks`).
- **Perf HUD + Web Vitals**: Real-time CLS/LCP/INP capture with long-task logging + optional overlay (`PerformanceHUD`, `usePerformanceDiagnostics`).
- **Monitoring**: Sentry initialized via `VITE_SENTRY_DSN`; wraps app with profiler + replay hooks (`src/monitoring/initMonitoring.js`, `src/main.jsx`).
- **Asset compression**: Dual Brotli+Gzip via `vite-plugin-compression`; manual chunks refined in `vite.config.js`.
- **Service worker hardening**: Production-only registration, pre-cache basic shell, runtime cache with stale-while-revalidate to avoid dev interference (`public/sw.js`).
- **CI/CD**: Lighthouse CI workflow (`.github/workflows/performance-audit.yml`) enforces 90+ scores; config at `lighthouserc.json`.

## 5. Monitoring & Alerting
- `VITE_SENTRY_DSN`, `VITE_SENTRY_TRACES_SAMPLE_RATE`, `VITE_SENTRY_REPLAY_SAMPLE_RATE` control telemetry.
- HUD toggle: `VITE_SHOW_PERF_PANEL=true` (dev/local only) surfaces Web Vitals + long tasks directly in UI.
- Long-task warnings emit to console when >50 ms frames are detected.

## 6. Scaling Checklist (≤100 ms TTI, 60 fps)
1. **Build**: `npm run build` (ensures tree-shaking + compression) → deploy `dist/`.
2. **Cache**: Serve `dist` behind HTTP server with Brotli/Gzip + far-future cache headers (`Cache-Control: public,max-age=31536000,immutable`) for `/assets`.
3. **Monitoring**: Keep Sentry enabled in production; review Web Vitals dashboard weekly.
4. **CI**: PRs must pass Lighthouse audit (≥0.9 perf/accessibility) before merge.
5. **Load test**: Use Chrome’s Performance panel with CPU throttling ×4 to emulate 10× traffic spikes; ensure Smooth Mode still hits 60 fps.

## 7. Future-Proof Micro-Interactions
- Default to Smooth Mode on mobile / low-power; heavier parallax and shader waves only on high-tier devices.
- Use `requestIdleCallback` for non-critical animations (candidate: certificate gallery filter badges).
- Consider offloading future 3D hero renders to Web Workers or pre-rendered MP4 for ultra-low-end devices.

Use this document as your quick reference when onboarding contributors or debugging future “runs fast in editor but slow in browser” regressions.

