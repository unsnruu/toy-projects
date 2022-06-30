import styled from "@emotion/styled";

import { Element } from "./DnDContainer";

const GraphWrapper = styled.div`
  width: 310px;
  height: 310px;
  padding: 2rem;
  border: 1px solid black;
`;
interface DnDGraphProps {
  elements: Element[];
  handleDragEnter: (id: Number) => (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragLeave: (id: Number) => (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragLeaveOuter: (e: React.DragEvent<HTMLDivElement>) => void;
}
function DnDGraph({
  elements,
  handleDragEnter,
  handleDragLeave,
  handleDragLeaveOuter,
}: DnDGraphProps) {
  return (
    <GraphWrapper onDragLeave={handleDragLeaveOuter}>
      {elements.map(({ id, isMounted, isVisible }) => (
        <GraphElement
          id={id}
          key={id}
          isMounted={isMounted}
          isVisible={isVisible}
          handleDragEnter={handleDragEnter(id)}
          handleDragLeave={handleDragLeave(id)}
        />
      ))}
    </GraphWrapper>
  );
}

export default DnDGraph;

interface GraphElementProps extends Element {
  handleDragEnter: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
}
const StyledDiv = styled.div<{ isVisible: boolean; isMounted: boolean }>`
  width: 100px;
  height: 100px;
  border: 1px solid black;
  background-color: ${({ isMounted }) => (isMounted ? "red" : "pink")};
  display: inline-block;
  opacity: ${({ isVisible, isMounted }) => (isVisible || isMounted ? 1 : 0)};
  transition: opacity 0.2s linear;
`;

function GraphElement({
  isMounted,
  isVisible,
  handleDragEnter,
  handleDragLeave,
}: GraphElementProps) {
  return (
    <StyledDiv
      isVisible={isVisible}
      isMounted={isMounted}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    />
  );
}
