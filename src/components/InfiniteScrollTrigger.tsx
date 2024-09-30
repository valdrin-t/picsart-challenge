import React, { useEffect, useRef } from "react";

interface InfiniteScrollTriggerProps {
  onIntersect: () => void;
}

export const InfiniteScrollTrigger: React.FC<InfiniteScrollTriggerProps> = ({
  onIntersect,
}) => {
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trigger = triggerRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onIntersect();
        }
      },
      { threshold: 1.0 }
    );

    if (trigger) {
      observer.observe(trigger);
    }

    return () => {
      if (trigger) {
        observer.unobserve(trigger);
      }
    };
  }, [onIntersect]);

  return <div ref={triggerRef} style={{ height: "10px", width: "100%" }} />;
};
