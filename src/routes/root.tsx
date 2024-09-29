import { MasonryGrid } from "@/components/MasonryGrid";
import useGetPhotos from "@/hooks/useGetPhotos";
import styled from "styled-components";

const Header = styled.h1`
  text-align: center;
`;

export default function Root() {
  const { photos } = useGetPhotos();

  return (
    <main>
      <Header>Masonry layout</Header>
      <MasonryGrid photos={photos} />
    </main>
  );
}
