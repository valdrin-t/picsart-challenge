import { Photo } from "@/utils/types";
import { useEffect, useRef, useState } from "react";

/**
 * Note:  This hook is not being used but it's kept for reference on how
 * an alternative approach to virtualization could be implemented.
 * For example, this could be used to add fadein animations to new images being loaded.
 */
export const useVirtualization = (columns: Photo[][]) => {
  const [visibleImages, setVisibleImages] = useState<Set<string>>(new Set());
  const imageRefs = useRef<Map<string, HTMLImageElement>>(new Map());

  useEffect(() => {
    const images = imageRefs.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const imageId = entry.target.getAttribute("data-id");
          if (imageId && entry.isIntersecting) {
            setVisibleImages((prev) => new Set(prev).add(imageId));
          }
        });
      },
      {
        root: null,
        rootMargin: "10px",
        threshold: 0.1,
      }
    );

    images.forEach((el) => observer.observe(el));

    return () => {
      images.forEach((el) => observer.unobserve(el));
    };
  }, [columns]);

  return { visibleImages, imageRefs };
};
