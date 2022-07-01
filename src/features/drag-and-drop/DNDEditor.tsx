import React from "react";
import styled from "@emotion/styled/";

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
const Rect = styled.div<{ color: string }>`
  width: 20px;
  height: 20px;
  background-color: ${(props) => props.color};
`;
const Tri = styled.div<{ color: string }>`
  width: 0px;
  height: 0px;
  border-bottom: calc(10px * 1.732) solid ${(props) => props.color};
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
`;
const Circle = styled.div<{ color: string }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

interface EditorProps {
  editorSelection: EditorSelection;
  handleDragStart: (shape: Shape, color: string) => () => void;
  handleDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
  changeEditorColor: (color: string) => void;
}

function DnDEditor({
  editorSelection,
  handleDragStart,
  handleDragEnd,
  changeEditorColor,
}: EditorProps) {
  return (
    <EditorWrapper>
      <Rect
        draggable={true}
        onDragStart={handleDragStart("rectangle", editorSelection.color)}
        onDragEnd={handleDragEnd}
        color={editorSelection.color}
      />
      <Tri
        draggable={true}
        onDragStart={handleDragStart("triangle", editorSelection.color)}
        onDragEnd={handleDragEnd}
        color={editorSelection.color}
      />
      <Circle
        draggable={true}
        onDragStart={handleDragStart("circle", editorSelection.color)}
        onDragEnd={handleDragEnd}
        color={editorSelection.color}
      />
      <div>
        <input
          type="color"
          onChange={({ target }) => {
            changeEditorColor(target.value);
          }}
        />
      </div>
    </EditorWrapper>
  );
}

export default DnDEditor;
