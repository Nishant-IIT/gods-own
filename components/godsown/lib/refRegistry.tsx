'use client';

import { createContext, useContext, type MutableRefObject, type ReactNode } from 'react';
import type { Refs } from './textChoreography';

const RefRegistryContext = createContext<MutableRefObject<Refs> | null>(null);

export function RefRegistryProvider({ registry, children }: { registry: MutableRefObject<Refs>; children: ReactNode }) {
  return <RefRegistryContext.Provider value={registry}>{children}</RefRegistryContext.Provider>;
}

/**
 * Every chapter calls `reg('someKey')` and spreads it onto an element's
 * `ref` prop. `Experience` collects the same flat key → element map the
 * ported `updateText()` expects and drives it from one ScrollTrigger.
 */
export function useReg() {
  const registry = useContext(RefRegistryContext);
  if (!registry) throw new Error('useReg() must be used within RefRegistryProvider');
  return (key: string) => (el: HTMLElement | null) => {
    registry.current[key] = el;
  };
}
