import { ErrorResponse, Link, useRouteError } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <Container>
      <h1> Oops! </h1>
      <h2>
        {(error as ErrorResponse).status} {(error as ErrorResponse)?.statusText}
      </h2>
      <p>
        <i>{(error as Error)?.message}</i>
      </p>

      <Link to="/">Go back to the home page</Link>
    </Container>
  );
}
