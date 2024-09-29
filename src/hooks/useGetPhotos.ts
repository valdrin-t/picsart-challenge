import { getPhotos } from "@/utils/api";
import { Photo } from "@/utils/types";
import { useEffect, useState } from "react";

const useGetPhotos = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);

      try {
        const data = await getPhotos();
        setPhotos(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  return { photos, loading, error };
};

export default useGetPhotos;
