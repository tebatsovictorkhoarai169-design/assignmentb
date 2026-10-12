import { useState, useEffect } from 'react';

// Animates a number towards `target`. Starts from wherever it currently is,
// so switching between peaks feels like climbing or descending.
export default function useCountUp(target, start = 1400, duration = 1400) {
  const [value, setValue] = useState(start);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setValue(target);
      return undefined;
    }
    let frame;
    let from = null;
    let t0 = null;
    const step = (now) => {
      if (t0 === null) t0 = now;
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue((prev) => {
        if (from === null) from = prev;
        return Math.round(from + (target - from) * eased);
      });
      if (p < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return value;
}
