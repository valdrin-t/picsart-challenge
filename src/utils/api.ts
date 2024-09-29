import { UnsplashAccessKey } from "@/utils/config";

const unsplashUrl = "https://api.unsplash.com/photos";
const headers = { Authorization: `Client-ID ${UnsplashAccessKey}` };

export const getPhotoById = async (id: string) => {
  const response = await fetch(`${unsplashUrl}/${id}`, { headers });

  if (!response.ok) {
    throw new Error("Failed to fetch photo");
  }

  return await response.json();
};

export const getPhotos = async () => {
  const response = await fetch(`${unsplashUrl}/?count=30`, { headers });

  if (!response.ok) {
    throw new Error("Failed to fetch photos");
  }

  return await response.json();
};
