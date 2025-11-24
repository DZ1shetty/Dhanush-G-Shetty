import { useEffect, useMemo, useRef, useState } from 'react';
import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals';
import { getEnvironmentSnapshot } from '../utils/browserDiagnostics.js';

const DEFAULT_LIMIT = 5;
const noop = () => {};

export function usePerformanceDiagnostics({
  enabled = import.meta.env.DEV || import.meta.env.VITE_ENABLE_PERF_LOGS === 'true',
  includeLongTasks = true,
  consoleReporter = true,
  onReport = noop
} = {}) {
  const [metrics, setMetrics] = useState({});
  const [longTasks, setLongTasks] = useState([]);
  const [envInfo, setEnvInfo] = useState(null);
  const paintsRef = useRef([]);

  const vitalsHandlers = useMemo(() => ({
    CLS: onCLS,
    INP: onINP,
    LCP: onLCP,
    FCP: onFCP,
    TTFB: onTTFB
  }), []);

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') {
      return undefined;
    }

    setEnvInfo(getEnvironmentSnapshot());

    const unsubscribes = Object.entries(vitalsHandlers).map(([name, hook]) => {
      return hook((metric) => {
        setMetrics((prev) => {
          const next = { ...prev, [name]: Number(metric.value.toFixed(2)) };
          onReport({ type: 'vitals', name, value: next[name] });
          return next;
        });
      });
    });

    let paintObserver;
    let longTaskObserver;

    if ('PerformanceObserver' in window) {
      try {
        paintObserver = new PerformanceObserver((list) => {
          paintsRef.current = [
            ...paintsRef.current,
            ...list.getEntries().map(({ name, startTime }) => ({
              name,
              startTime: Number(startTime.toFixed(2))
            }))
          ].slice(-DEFAULT_LIMIT);
        });
        paintObserver.observe({ entryTypes: ['paint'] });
      } catch {
        // ignore older browsers
      }

      if (includeLongTasks) {
        try {
          longTaskObserver = new PerformanceObserver((list) => {
            const mapped = list.getEntries().map((entry) => ({
              name: entry.name || 'longtask',
              startTime: Number(entry.startTime.toFixed(2)),
              duration: Number(entry.duration.toFixed(2)),
              attribution: entry.attribution?.map((a) => a.name) ?? []
            }));
            setLongTasks((prev) => [...mapped, ...prev].slice(0, DEFAULT_LIMIT));
            mapped.forEach((entry) => onReport({ type: 'longtask', entry }));
          });
          longTaskObserver.observe({ entryTypes: ['longtask'] });
        } catch {
          // ignore missing support
        }
      }
    }

    return () => {
      unsubscribes.forEach((unsubscribe) => unsubscribe?.());
      paintObserver?.disconnect();
      longTaskObserver?.disconnect();
    };
  }, [enabled, includeLongTasks, onReport, vitalsHandlers]);

  useEffect(() => {
    if (!enabled || !consoleReporter) return;
    if (Object.keys(metrics).length === 0) return;
    const logGroup = '[Diagnostics] Web Vitals Snapshot';
    console.groupCollapsed(logGroup);
    console.table(metrics);
    if (longTasks.length) {
      console.table(longTasks);
    }
    if (paintsRef.current.length) {
      console.table(paintsRef.current);
    }
    console.groupEnd(logGroup);
  }, [consoleReporter, enabled, longTasks, metrics]);

  return { metrics, longTasks, paints: paintsRef.current, envInfo };
}

