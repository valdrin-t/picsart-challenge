import styled from "styled-components";

interface LoadingSkeletonProps {
  width?: string;
  height: string;
  borderRadius?: number;
  isVisible: boolean;
  children?: React.ReactNode;
}

const LoadingContainer = styled.div<Omit<LoadingSkeletonProps, "isVisible">>`
  width: ${(props) => props.width};
  min-height: ${(props) => props.height};
  background: linear-gradient(-45deg, #eee 40%, #fafafa 50%, #eee 60%);
  background-size: 300%;
  background-position-x: 100%;
  animation: shimmer 1.5s infinite linear;
  border-radius: ${(props) => props.borderRadius || 16}px;

  @keyframes shimmer {
    to {
      background-position-x: 0%;
    }
  }
`;

export const LoadingSkeleton = ({
  height,
  isVisible,
  width = "100%",
  borderRadius = 16,
  children,
}: LoadingSkeletonProps) => {
  if (!isVisible) {
    return children;
  }

  return (
    <LoadingContainer
      height={height}
      width={width}
      borderRadius={borderRadius}
    />
  );
};
