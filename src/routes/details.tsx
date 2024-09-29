import { ErrorContainer } from "@/components/ErrorContainer";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import useGetPhotoById from "@/hooks/useGetPhotoById";
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 24px;
  gap: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Image = styled.img`
  border-radius: 16px;
  max-width: 100%;
  height: auto;
`;

const Username = styled.a`
  opacity: 90%;
  font-style: italic;
  font-size: 14px;
`;

const UserContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  min-height: 56px;
`;

const PhotoDescription = styled.p`
  margin: 0;
  font-style: italic;
`;

export default function Details() {
  const { photoId } = useParams();
  const { photo, error, loading } = useGetPhotoById(photoId);
  const [imageLoaded, setImageLoaded] = useState(false);

  const isLoading = useMemo(
    () => loading || !imageLoaded,
    [loading, imageLoaded]
  );

  if (error) return <ErrorContainer message={error.message} />;

  return (
    <Container>
      <Link to="/">Go back</Link>

      <LoadingSkeleton height="100px" width="50%" isVisible={isLoading}>
        <h3 style={{ marginBottom: 0 }}>{photo?.alt_description}</h3>
        {photo?.description ? (
          <PhotoDescription>{photo?.description}</PhotoDescription>
        ) : null}
      </LoadingSkeleton>

      <LoadingSkeleton isVisible={isLoading} height="24px" width="200px">
        <UserContainer>
          <p>Photo by: {photo?.user.name}</p>
          <Username href={photo?.user.links.html} target="_blank">
            @{photo?.user.username}
          </Username>
        </UserContainer>
      </LoadingSkeleton>

      <LoadingSkeleton isVisible={isLoading} height="90vh" />
      <Image onLoad={() => setImageLoaded(true)} src={photo?.urls.regular} />
    </Container>
  );
}
