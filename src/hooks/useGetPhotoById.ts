import { getPhotoById } from "@/utils/api";
import { Photo } from "@/utils/types";
import { useEffect, useState } from "react";

const useGetPhotoById = (id?: string) => {
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchPhoto = async () => {
      setLoading(true);

      try {
        const data = await getPhotoById(id);
        setPhoto(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhoto();
  }, [id]);

  return { photo, loading, error };
};

export default useGetPhotoById;
