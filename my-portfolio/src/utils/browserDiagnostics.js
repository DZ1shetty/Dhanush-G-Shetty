let cachedSnapshot = null;

const hasMatchMedia = () => typeof window !== 'undefined' && typeof window.matchMedia === 'function';

export function detectBrowser() {
  if (typeof navigator === 'undefined') {
    return {
      name: 'server',
      vendor: 'unknown',
      version: '0',
      isBrave: false,
      isChrome: false,
      isFirefox: false,
      isSafari: false,
      isEdge: false
    };
  }

  const ua = navigator.userAgent || '';
  const vendor = navigator.vendor || '';
  const isBrave = Boolean(navigator.brave);
  const isEdge = /\bEdg\//i.test(ua);
  const isFirefox = /Firefox/i.test(ua);
  const isSafari = /Safari/i.test(ua) && !/Chrome|Chromium/i.test(ua);
  const isChrome = !isEdge && !isBrave && /Chrome|Chromium/i.test(ua) && /Google Inc/.test(vendor);

  return {
    name: isBrave ? 'Brave' : isEdge ? 'Edge' : isFirefox ? 'Firefox' : isSafari ? 'Safari' : isChrome ? 'Chrome' : 'Other',
    version: ua.match(/(Chrome|Firefox|Safari|Edg)\/([\d.]+)/)?.[2] ?? 'unknown',
    vendor,
    isBrave,
    isChrome,
    isFirefox,
    isSafari,
    isEdge
  };
}

function detectHardwareAcceleration() {
  if (typeof document === 'undefined') return undefined;
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return Boolean(gl);
  } catch {
    return false;
  }
}

export function getEnvironmentSnapshot({ force = false } = {}) {
  if (cachedSnapshot && !force) {
    return cachedSnapshot;
  }

  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    cachedSnapshot = {
      browser: detectBrowser(),
      hardwareConcurrency: 4,
      deviceMemory: 4,
      saveData: false,
      batterySaver: false,
      prefersReducedMotion: false,
      prefersCoarsePointer: false,
      hardwareAcceleration: true,
      gpuBlocked: false,
      isMobile: false,
      platform: 'server'
    };
    return cachedSnapshot;
  }

  const prefersReducedMotion = hasMatchMedia() && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const prefersCoarsePointer = hasMatchMedia() && window.matchMedia('(pointer: coarse)').matches;
  const browser = detectBrowser();
  const hardwareAcceleration = detectHardwareAcceleration();
  const isMobile = /Android|iPhone|iPad|Mobile/i.test(navigator.userAgent || '');
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

  cachedSnapshot = {
    browser,
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    hardwareConcurrency: navigator.hardwareConcurrency ?? 4,
    deviceMemory: navigator.deviceMemory ?? 4,
    saveData: connection?.saveData ?? false,
    batterySaver: connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g',
    prefersReducedMotion,
    prefersCoarsePointer,
    hardwareAcceleration,
    gpuBlocked: hardwareAcceleration === false,
    isMobile,
    hardwareVendor: navigator.hardwareConcurrency ? undefined : 'unknown'
  };

  return cachedSnapshot;
}

