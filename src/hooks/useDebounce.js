import { useEffect, useState } from "react";

export default function useDebounce(value, delay = 400) {
  const [state, setState] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setState(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return state;
}
