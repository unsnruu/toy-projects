import styled from "@emotion/styled";
import React, { useState, useEffect } from "react";

interface Element {
  id: number;
  isVisible: boolean;
  isMounted: boolean;
}
const initElements: Element[] = Array.from({ length: 9 }, (v, idx) => ({
  id: idx,
  isMounted: false,
  isVisible: false,
}));
initElements[0].isMounted = true;
initElements[0].isVisible = true;

const GraphWrapper = styled.div`
  width: 310px;
  height: 310px;
`;

function DNDGraph() {
  const [elements, setElements] = useState<Element[]>(initElements);

  //Event Handlers
  const handleDragEnter =
    (id: Number) => (event: React.DragEvent<HTMLDivElement>) => {
      console.log(`Entered on element ${id}`);

      const newElements = elements.map((elem) => {
        if (elem.id === id && !elem.isMounted) {
          elem.isVisible = true;
        }
        return elem;
      });
      setElements((prev) => newElements);
    };

  const handleDragLeave =
    (id: Number) => (event: React.DragEvent<HTMLDivElement>) => {
      console.log(`Leave on element ${id}`);

      const newElements = elements.map((elem) => {
        if (elem.id === id && !elem.isMounted) {
          elem.isVisible = false;
        }
        return elem;
      });
      setElements((prev) => newElements);
    };

  return (
    <GraphWrapper>
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

export default DNDGraph;

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
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
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
