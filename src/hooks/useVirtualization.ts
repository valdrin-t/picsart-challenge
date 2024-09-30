import { Photo } from "@/utils/types";
import { useEffect, useRef, useState } from "react";

/**
 * Provides a hook for virtualizing a list of images based on their visibility
 * in the viewport. This hook will return an object containing a set of visible
 * image IDs and a reference to a map of image elements.
 *
 * @param columns A 2D array of photos, where each inner array is a column of
 * photos.
 * @returns An object containing the visible image IDs and a reference to the
 * image elements.
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
        rootMargin: "100px",
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
