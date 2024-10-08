import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { useVirtualization } from "@/hooks/useVirtualization";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import { Photo } from "@/utils/types";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface MasonryGridProps {
  photos: Photo[];
  breakpoints?: number[];
  gap?: number;
}

const Wrapper = styled.div<{ $gap: number }>`
  display: flex;
  gap: ${({ $gap }) => $gap}px;
  padding: 12px;
  justify-content: center;
`;

const Column = styled.div<{ $gap: number }>`
  display: flex;
  flex-direction: column;
  gap: ${({ $gap }) => $gap}px;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

export const MasonryGrid: React.FC<MasonryGridProps> = ({
  photos,
  breakpoints = [600, 900, 1300],
  gap = 10,
}) => {
  const windowWidth = useWindowWidth();
  const containerRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState<Photo[][]>([]);
  const { imageRefs, visibleImages } = useVirtualization(columns);

  // Calculate the number of columns
  const columnCount = useMemo(
    () =>
      breakpoints.reduce(
        (count, breakpoint) => (windowWidth > breakpoint ? count + 1 : count),
        1
      ),
    [breakpoints, windowWidth]
  );

  const calculateLayout = useCallback(() => {
    if (!containerRef.current || !columnCount || !photos.length) return;

    // Calculate the layout
    const containerWidth = containerRef.current.offsetWidth;
    const columnWidth =
      (containerWidth - gap * (columnCount - 1)) / columnCount;

    const newColumns: Photo[][] = Array.from({ length: columnCount }, () => []);
    const columnHeights: number[] = Array(columnCount).fill(0);

    // Populate the columns with images
    photos.forEach((image) => {
      const shortestIndex = columnHeights.indexOf(Math.min(...columnHeights));
      newColumns[shortestIndex].push(image);

      const scaledHeight = (image.height / image.width) * columnWidth;
      columnHeights[shortestIndex] += scaledHeight + gap;
    });

    setColumns(newColumns);
  }, [columnCount, gap, photos]);

  useEffect(() => {
    calculateLayout();
  }, [calculateLayout]);

  return (
    <Wrapper ref={containerRef} $gap={gap}>
      <LoadingSkeleton height="100vh" isVisible={columns.length === 0}>
        {columns.map((column, columnIndex) => (
          <Column $gap={gap} key={columnIndex}>
            {column.map((image) => (
              <Link key={image.id} to={`/photos/${image.id}`}>
                <Image
                  ref={(el) => el && imageRefs.current.set(image.id, el)}
                  srcSet={`${image.urls.small} 1x, ${image.urls.regular} 2x`}
                  src={visibleImages.has(image.id) ? image.urls.small : ""}
                  alt={image.alt_description}
                  loading="lazy"
                />
              </Link>
            ))}
          </Column>
        ))}
      </LoadingSkeleton>
    </Wrapper>
  );
};
