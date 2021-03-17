import { useRef, useCallback } from "react";

export default function useScrollDown() {
  const scrollRef = useRef(null);

  const scrollDown = useCallback(() => {
    const { offsetHeight, scrollHeight } = scrollRef.current;
    scrollRef.current.scrollTop = scrollHeight - offsetHeight;
  }, []);

  return [scrollRef, scrollDown];
}
