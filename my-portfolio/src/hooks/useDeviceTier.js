import { useEffect, useState } from 'react';
import { getEnvironmentSnapshot } from '../utils/browserDiagnostics.js';

const DEFAULT_STATE = {
  deviceTier: 'unknown',
  defaultSmoothMode: false,
  disableGpuEffects: false,
  prefersTouchOptimizedUI: false,
  connection: {
    effectiveType: '4g',
    saveData: false
  },
  animationBudget: 60,
  reason: 'booting'
};

const NETWORK_PRIORITIES = {
  'slow-2g': 'low',
  '2g': 'low',
  '3g': 'medium',
  '4g': 'high'
};

export function useDeviceTier() {
  const [state, setState] = useState(DEFAULT_STATE);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const snapshot = getEnvironmentSnapshot();
    const cores = snapshot.hardwareConcurrency ?? 4;
    const memory = snapshot.deviceMemory ?? 4;
    const saveData = snapshot.saveData ?? false;
    const batterySaver = snapshot.batterySaver ?? false;
    const reducedMotion = snapshot.prefersReducedMotion ?? false;
    const isCoarsePointer = snapshot.prefersCoarsePointer ?? false;
    const isMobile = snapshot.isMobile ?? false;
    const prefersDark = snapshot.prefersDarkScheme ?? true;
    const isBrave = snapshot.browser?.isBrave ?? false;
    const effectiveType = snapshot.connection?.effectiveType ?? '4g';
    const downlink = snapshot.connection?.downlink ?? 10;

    const isNetworkConstrained = ['slow-2g', '2g', '3g'].includes(effectiveType) || downlink < 1.5 || saveData;
    const isHighTier =
      cores >= 8 &&
      memory >= 8 &&
      !saveData &&
      !batterySaver &&
      !isNetworkConstrained &&
      !reducedMotion;
    const isLowTier =
      cores <= 4 ||
      memory <= 4 ||
      reducedMotion ||
      isCoarsePointer ||
      isMobile ||
      isNetworkConstrained;

    const deviceTier = isLowTier ? 'low' : isHighTier ? 'high' : 'medium';

    const defaultSmoothMode = isLowTier || reducedMotion || saveData || batterySaver;
    const disableGpuEffects =
      defaultSmoothMode ||
      snapshot.hardwareAcceleration === false ||
      snapshot.gpuBlocked ||
      (isBrave && snapshot.hardwareAcceleration === false);

    const animationBudget = deviceTier === 'high' ? 60 : deviceTier === 'medium' ? 45 : 30;

    const reason =
      [
        isBrave ? 'Brave' : null,
        reducedMotion ? 'prefers-reduced-motion' : null,
        saveData ? 'Save-Data' : null,
        batterySaver ? 'BatterySaver' : null,
        isMobile ? 'mobile' : null,
        snapshot.hardwareAcceleration === false ? 'GPU-off' : null,
        isNetworkConstrained ? `net-${effectiveType}` : null
      ]
        .filter(Boolean)
        .join(', ') || 'baseline';

    setState({
      deviceTier,
      defaultSmoothMode,
      disableGpuEffects,
      prefersTouchOptimizedUI: isMobile || isCoarsePointer,
      prefersDark,
      connection: {
        effectiveType,
        saveData,
        downlink
      },
      animationBudget,
      networkPriority: NETWORK_PRIORITIES[effectiveType] ?? 'high',
      reason
    });
  }, []);

  return state;
}
