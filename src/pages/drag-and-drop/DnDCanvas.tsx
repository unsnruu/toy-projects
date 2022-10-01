import React, { useState } from "react";
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
  handleDragEnter: (id: number) => (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragLeave: (id: number) => (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragLeaveOuter: (e: React.DragEvent<HTMLDivElement>) => void;
}

// interface CanvasRow {}
function DnDCanvas({
  elements,
  handleDragEnter,
  handleDragLeave,
  handleDragLeaveOuter,
}: DnDCanvasProps) {
  // const [canvasRows, setCanvasRows] = useState([]);
  const itemStyle: React.CSSProperties = {
    height: "1rem",
    backgroundColor: "skyblue",
    marginBottom: "1rem",
  };
  const [items, setItems] = useState<Element[]>([
    {
      color: "black",
      id: 0,
      isHovering: false,
      isMounted: false,
      shape: "rectangle",
    },
  ]);
  return (
    <CanvasWrapper>
      {elements.map(({ id, shape, color, isMounted, isHovering }) => (
        <CanvasElement
          id={id}
          key={id}
          shape={shape}
          color={color}
          isMounted={isMounted}
          isHovering={isHovering}
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
  isHovering: boolean;
  isMounted: boolean;
}
const Rectangle = styled.div<ShpaeProps>`
  width: 100px;
  height: 100px;
  background-color: ${({ isMounted, isHovering, color }) =>
    isMounted ? color : isHovering ? "gray" : "white"};
  display: inline-block;
  opacity: 1;
  transition: opacity 0.2s linear;
`;
const Triangle = styled.div<ShpaeProps>`
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: calc(50px * 1.732) solid
    ${({ isHovering, isMounted, color }) =>
      isMounted ? color : isHovering ? "gray" : "white"};
  display: inline-block;
  opacity: ${({ isHovering, isMounted }) => (isHovering || isMounted ? 1 : 0)};
  transition: opacity 0.2s linear;
`;
const Circle = styled.div<ShpaeProps>`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: inline-block;
  background-color: ${({ isMounted, isHovering, color }) =>
    isMounted ? color : isHovering ? "gray" : "white"};
  opacity: ${({ isHovering, isMounted }) => (isHovering || isMounted ? 1 : 0)};
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
  isHovering,
  handleDragEnter,
  handleDragLeave,
}: CanvasElementProps) {
  switch (shape) {
    case "circle":
      return (
        <Circle
          color={color}
          isHovering={isHovering}
          isMounted={isMounted}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
        />
      );
    case "rectangle":
      return (
        <Rectangle
          color={color}
          isHovering={isHovering}
          isMounted={isMounted}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
        />
      );
    case "triangle":
      return (
        <Triangle
          color={color}
          isHovering={isHovering}
          isMounted={isMounted}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
        />
      );
  }
}
// {
//   elements.map(({ id, shape, color, isMounted, isHovering }) => (
//     <CanvasElement
//       id={id}
//       key={id}
//       shape={shape}
//       color={color}
//       isMounted={isMounted}
//       isHovering={isHovering}
//       handleDragEnter={handleDragEnter(id)}
//       handleDragLeave={handleDragLeave(id)}
//     />
//   ));
// }
