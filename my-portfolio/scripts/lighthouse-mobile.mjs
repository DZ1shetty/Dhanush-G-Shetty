#!/usr/bin/env node
import { execSync } from 'node:child_process';

const url = process.argv[2] ?? 'http://localhost:4173';

const flags = [
  '--only-categories=performance,accessibility,best-practices,seo',
  '--form-factor=mobile',
  '--screenEmulation.mobile',
  '--throttling-method=devtools',
  '--throttling.cpuSlowdownMultiplier=4',
  '--throttling.rttMs=150',
  '--throttling.throughputKbps=1638',
  '--preset=perf'
];

console.log(`Running Lighthouse mobile audit on ${url}...`);
try {
  execSync(`npx lighthouse ${url} ${flags.join(' ')}`, {
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_OPTIONS: '--max_old_space_size=4096'
    }
  });
} catch (error) {
  process.exitCode = error.status ?? 1;
}

