import { useMemo, useState } from 'react';

const panelStyles = 'fixed bottom-4 right-4 z-[60] max-w-sm text-xs font-mono';

export default function PerformanceHUD({ metrics = {}, longTasks = [], envInfo }) {
  const [collapsed, setCollapsed] = useState(false);

  const metricRows = useMemo(
    () =>
      Object.entries(metrics).map(([key, value]) => ({
        key,
        value: typeof value === 'number' ? `${value}` : String(value)
      })),
    [metrics]
  );

  if (!envInfo) return null;

  return (
    <div className={panelStyles}>
      <div className="bg-slate-900/80 border border-cyan-500/40 rounded-lg shadow-2xl backdrop-blur p-3 text-slate-200">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-400">Perf Monitor</p>
            <p className="text-xs text-slate-400">
              {envInfo.browser?.name} · {envInfo.deviceTier ?? 'tier?'}
            </p>
          </div>
          <button
            type="button"
            className="px-2 py-1 rounded border border-white/10 text-xs uppercase tracking-widest hover:border-cyan-400 transition"
            onClick={() => setCollapsed((prev) => !prev)}
          >
            {collapsed ? 'Expand' : 'Collapse'}
          </button>
        </div>

        {!collapsed && (
          <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
            <section>
              <p className="text-xs text-cyan-300 mb-1">Web Vitals</p>
              <ul className="space-y-0.5">
                {metricRows.map(({ key, value }) => (
                  <li key={key} className="flex justify-between gap-2">
                    <span className="text-slate-400">{key}</span>
                    <span className="text-white">{value}</span>
                  </li>
                ))}
                {metricRows.length === 0 && (
                  <li className="text-slate-500">Collecting metrics…interact with the page</li>
                )}
              </ul>
            </section>

            {longTasks.length > 0 && (
              <section>
                <p className="text-[10px] text-cyan-300 mb-1">Long Tasks (last {longTasks.length})</p>
                <ul className="space-y-0.5">
                  {longTasks.map((task, idx) => (
                    <li key={`${task.startTime}-${idx}`} className="flex flex-col text-[11px]">
                      <span className="text-white">{task.duration}ms</span>
                      <span className="text-slate-500">{task.attribution?.join(', ') || 'main thread'}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section className="text-[11px] text-slate-400">
              <p className="text-[10px] text-cyan-300 mb-1">Environment</p>
              <p>Cores: {envInfo.hardwareConcurrency}</p>
              <p>Memory: {envInfo.deviceMemory} GB</p>
              <p>Prefers Reduced Motion: {String(envInfo.prefersReducedMotion)}</p>
              <p>Save Data: {String(envInfo.saveData)}</p>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

