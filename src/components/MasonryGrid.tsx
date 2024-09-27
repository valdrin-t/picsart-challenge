import { Photo } from "@/utils/types";
import React, { useMemo } from "react";
import { Link } from "react-router-dom";

interface MasonryGridProps {
  photos: Photo[];
}

export const MasonryGrid: React.FC<MasonryGridProps> = ({ photos }) => {
  const gridItems = useMemo(() => {
    return photos.map((photo) => {
      return (
        <Link key={photo.id} to={`/photo/${photo.id}`}>
          <img src={photo.urls.small} alt={photo.alt_description} />
        </Link>
      );
    });
  }, [photos]);

  // TODO: Get dynamic height
  return <div style={{ height: 300, position: "relative" }}>{gridItems}</div>;
};
