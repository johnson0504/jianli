import { useEffect, useLayoutEffect, useRef, useState } from 'react';

// The page never depends on the animation chunk to render or remain usable.
export function usePortfolioMotion(filter, ability, modal) {
  const [engine, setEngine] = useState(null);
  const snapshot = useRef(null);
  useEffect(() => {
    let disposed = false, cleanup;
    import('./motion.js').then(module => {
      if (disposed) return;
      try {
        cleanup = module.mountMotion();
        setEngine(module);
      } catch (error) {
        module.resetMotion();
        console.warn('Motion unavailable; static presentation retained.', error);
      }
    }).catch(() => { /* All content is visible without this optional chunk. */ });
    return () => { disposed = true; cleanup?.(); };
  }, []);
  useLayoutEffect(() => {
    if (!engine || !snapshot.current) return;
    engine.animateGrid(snapshot.current);
    snapshot.current = null;
  }, [engine, filter]);
  useLayoutEffect(() => {
    if (engine) return engine.animateAbility();
  }, [engine, ability]);
  useEffect(() => {
    if (engine && modal) return engine.animateDialog();
  }, [engine, modal]);
  return () => { snapshot.current = engine?.captureGrid() || null; };
}
