import { MasonryGrid } from "@/components/MasonryGrid";
import useUnsplashApi from "@/hooks/useUnsplashApi";

export default function Root() {
  const { photos } = useUnsplashApi("dogs");

  return (
    <>
      <MasonryGrid photos={photos} />
    </>
  );
}
