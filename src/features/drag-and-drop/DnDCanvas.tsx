import styled from "@emotion/styled";

import { Element, Shape } from "./DnDContainer";

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
      {elements.map(({ id, shape, isMounted, isVisible }) => (
        <GraphElement
          id={id}
          key={id}
          shape={shape}
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

const Rectangle = styled.div<{ isVisible: boolean; isMounted: boolean }>`
  width: 100px;
  height: 100px;
  border: 1px solid black;
  background-color: ${({ isMounted }) => (isMounted ? "red" : "pink")};
  display: inline-block;
  opacity: ${({ isVisible, isMounted }) => (isVisible || isMounted ? 1 : 0)};
  transition: opacity 0.2s linear;
`;
const Triangle = styled.div<{ isVisible: boolean; isMounted: boolean }>`
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: calc(50px * 1.732) solid
    ${(props) => (props.isMounted ? "black" : "gray")};
  display: inline-block;
  opacity: ${({ isVisible, isMounted }) => (isVisible || isMounted ? 1 : 0)};
  transition: opacity 0.2s linear;
`;
const Circle = styled.div<{ isVisible: boolean; isMounted: boolean }>`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: inline-block;
  background-color: ${({ isMounted }) => (isMounted ? "black" : "gray")};
  opacity: ${({ isVisible, isMounted }) => (isVisible || isMounted ? 1 : 0)};
  transition: opacity 0.2s linear;
`;

interface GraphElementProps extends Element {
  handleDragEnter: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
}
function GraphElement({
  shape,
  isMounted,
  isVisible,
  handleDragEnter,
  handleDragLeave,
}: GraphElementProps) {
  switch (shape) {
    case "circle":
      return (
        <Circle
          isVisible={isVisible}
          isMounted={isMounted}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
        />
      );
    case "rectangle":
      return (
        <Rectangle
          isVisible={isVisible}
          isMounted={isMounted}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
        />
      );
    case "triangle":
      return (
        <Triangle
          isVisible={isVisible}
          isMounted={isMounted}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
        />
      );
  }
}
