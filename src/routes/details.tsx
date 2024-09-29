import useGetPhotoById from "@/hooks/useGetPhotoById";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 24px;
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
`;

const PhotoDescription = styled.p`
  margin: 0;
  font-style: italic;
`;

export default function Details() {
  const { photoId } = useParams();
  const { photo } = useGetPhotoById(photoId);

  return (
    <Container>
      <Link to="/">Go back</Link>

      <h3 style={{ marginBottom: 0 }}>{photo?.alt_description}</h3>
      {photo?.description ? (
        <PhotoDescription>{photo?.description}</PhotoDescription>
      ) : null}

      <UserContainer>
        <p>Photo by: {photo?.user.name}</p>
        <Username href={photo?.user.links.html} target="_blank">
          @{photo?.user.username}
        </Username>
      </UserContainer>

      <Image src={photo?.urls.regular} />
    </Container>
  );
}
