import { getPhotos } from "@/utils/api";
import { Photo } from "@/utils/types";
import { useEffect, useState } from "react";

export const useGetPhotos = (page: number) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);

      try {
        const data = await getPhotos(page);

        setPhotos((prevPhotos) => [...prevPhotos, ...data]);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [page]);

  return { photos, loading, error };
};
