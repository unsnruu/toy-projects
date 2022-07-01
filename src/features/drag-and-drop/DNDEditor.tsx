import styled from "@emotion/styled/";
import React from "react";

import { EditorSelection, Shape } from "./DnDContainer";

const EditorWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem;
  border: 1px solid black;
  padding: 1rem;
  & div {
    margin-right: 1rem;
  }
`;

const Rect = styled.div`
  width: 20px;
  height: 20px;
  background-color: black;
`;
const Tri = styled.div`
  width: 0px;
  height: 0px;
  /* background-color: black; */
  border-bottom: calc(10px * 1.732) solid black;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
`;
const Circle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: black;
`;

interface EditorProps {
  editorSelection: EditorSelection;
  handleDragStart: (shape: Shape) => () => void;
  handleDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
}

function DnDEditor({
  editorSelection,
  handleDragStart,
  handleDragEnd,
}: EditorProps) {
  return (
    <EditorWrapper>
      <Rect
        draggable={true}
        onDragStart={handleDragStart("rectangle")}
        onDragEnd={handleDragEnd}
      />
      <Tri
        draggable={true}
        onDragStart={handleDragStart("triangle")}
        onDragEnd={handleDragEnd}
      />
      <Circle
        draggable={true}
        onDragStart={handleDragStart("circle")}
        onDragEnd={handleDragEnd}
      />
    </EditorWrapper>
  );
}

export default DnDEditor;
