import { UnsplashAccessKey } from "@/utils/config";
import { Photo } from "@/utils/types";
import { useEffect, useState } from "react";

const unsplashUrl = "https://api.unsplash.com/photos/";

const useUnsplashApi = (query: string = "") => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);

      try {
        const response = await fetch(`${unsplashUrl}?count=30&query=${query}`, {
          headers: {
            Authorization: `Client-ID ${UnsplashAccessKey}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch photos");
        }
        const data = await response.json();
        setPhotos(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"));
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [query]);

  return { photos, loading, error };
};

export default useUnsplashApi;
