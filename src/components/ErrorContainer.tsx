import styled from "styled-components";

interface ErrorContainerProps {
  message: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const ErrorContainer = ({ message }: ErrorContainerProps) => {
  return (
    <Container>
      <h1>Oops!</h1>
      <h2>An error has occurred, please try again</h2>
      <i>{message}</i>
    </Container>
  );
};
