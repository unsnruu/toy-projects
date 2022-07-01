import styled from "@emotion/styled";

import { Element } from "./DnDContainer";

const CanvasWrapper = styled.div`
  width: 400px;
  height: 400px;
  padding: 2rem;
  border: 1px solid black;
  & div {
    margin: 0.5rem;
    flex: 1 1;
  }
`;
interface DnDCanvasProps {
  elements: Element[];
  handleDragEnter: (id: Number) => (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragLeave: (id: Number) => (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragLeaveOuter: (e: React.DragEvent<HTMLDivElement>) => void;
}
function DnDCanvas({
  elements,
  handleDragEnter,
  handleDragLeave,
  handleDragLeaveOuter,
}: DnDCanvasProps) {
  return (
    <CanvasWrapper onDragLeave={handleDragLeaveOuter}>
      {elements.map(({ id, shape, color, isMounted, isVisible }) => (
        <CanvasElement
          id={id}
          key={id}
          shape={shape}
          color={color}
          isMounted={isMounted}
          isVisible={isVisible}
          handleDragEnter={handleDragEnter(id)}
          handleDragLeave={handleDragLeave(id)}
        />
      ))}
    </CanvasWrapper>
  );
}

export default DnDCanvas;

interface ShpaeProps {
  color: string;
  isVisible: boolean;
  isMounted: boolean;
}
const Rectangle = styled.div<ShpaeProps>`
  width: 100px;
  height: 100px;
  border: 1px solid black;
  background-color: ${({ isMounted, color }) => (isMounted ? color : "pink")};
  display: inline-block;
  opacity: ${({ isVisible, isMounted }) => (isVisible || isMounted ? 1 : 0)};
  transition: opacity 0.2s linear;
`;
const Triangle = styled.div<ShpaeProps>`
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: calc(50px * 1.732) solid
    ${({ isMounted, color }) => (isMounted ? color : "gray")};
  display: inline-block;
  opacity: ${({ isVisible, isMounted }) => (isVisible || isMounted ? 1 : 0)};
  transition: opacity 0.2s linear;
`;
const Circle = styled.div<ShpaeProps>`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: inline-block;
  background-color: ${({ isMounted, color }) => (isMounted ? color : "gray")};
  opacity: ${({ isVisible, isMounted }) => (isVisible || isMounted ? 1 : 0)};
  transition: opacity 0.2s linear;
`;

interface CanvasElementProps extends Element {
  handleDragEnter: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
}
function CanvasElement({
  shape,
  color,
  isMounted,
  isVisible,
  handleDragEnter,
  handleDragLeave,
}: CanvasElementProps) {
  switch (shape) {
    case "circle":
      return (
        <Circle
          color={color}
          isVisible={isVisible}
          isMounted={isMounted}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
        />
      );
    case "rectangle":
      return (
        <Rectangle
          color={color}
          isVisible={isVisible}
          isMounted={isMounted}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
        />
      );
    case "triangle":
      return (
        <Triangle
          color={color}
          isVisible={isVisible}
          isMounted={isMounted}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
        />
      );
  }
}
