import { ErrorContainer } from "@/components/ErrorContainer";
import { MasonryGrid } from "@/components/MasonryGrid";
import useGetPhotos from "@/hooks/useGetPhotos";
import styled from "styled-components";

const Header = styled.h1`
  text-align: center;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px;
`;

export default function Root() {
  const { photos, error } = useGetPhotos();

  return (
    <Main>
      <Header>Masonry layout</Header>
      {error ? (
        <ErrorContainer message={error.message} />
      ) : (
        <MasonryGrid photos={photos} />
      )}
    </Main>
  );
}
