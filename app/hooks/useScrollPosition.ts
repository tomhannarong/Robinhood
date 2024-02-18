import { useEffect, useState, useRef } from "react";

const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const container = containerRef.current;

  const scrollToPosition = (position: number) => {
    const container = containerRef.current;
    if (container) {
      try {
        container?.scrollTo(0, position);
      } catch (error) {}
    }
  };
  useEffect(() => {
    if (!container) return;

    const handleScroll = () => {
      setScrollPosition(container.scrollTop);
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { scrollPosition, scrollToPosition, containerRef };
};

export default useScrollPosition;
