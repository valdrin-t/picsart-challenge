import { ErrorContainer } from "@/components/ErrorContainer";
import { InfiniteScrollTrigger } from "@/components/InfiniteScrollTrigger";
import { MasonryGrid } from "@/components/MasonryGrid";
import { useGetPhotos } from "@/hooks/useGetPhotos";
import { useCallback, useState } from "react";
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
  const [page, setPage] = useState(1);
  const { photos, error } = useGetPhotos(page);

  const loadMorePhotos = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  }, []);

  return (
    <Main>
      <Header>Masonry layout</Header>
      {error ? (
        <ErrorContainer message={error.message} />
      ) : (
        <>
          <MasonryGrid photos={photos} />
          <InfiniteScrollTrigger onIntersect={loadMorePhotos} />
        </>
      )}
    </Main>
  );
}
