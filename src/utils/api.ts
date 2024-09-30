const UnsplashAccessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

const unsplashUrl = "https://api.unsplash.com/photos";
const headers = { Authorization: `Client-ID ${UnsplashAccessKey}` };

export const getPhotoById = async (id: string) => {
  const response = await fetch(`${unsplashUrl}/${id}`, { headers });

  if (!response.ok) {
    throw new Error("Failed to fetch photo");
  }

  return await response.json();
};

export const getPhotos = async (page: number) => {
  const response = await fetch(`${unsplashUrl}/?page=${page}&per_page=30`, {
    headers,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch photos");
  }

  return await response.json();
};
