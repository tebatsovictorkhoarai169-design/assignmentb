import { useState, useEffect } from 'react';

// useState that survives a page refresh. Used for the visitor's saved trip list.
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage unavailable (private mode): the app still works in memory */
    }
  }, [key, value]);

  return [value, setValue];
}
