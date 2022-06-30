import styled from "@emotion/styled/";
import React from "react";

const Rect = styled.div`
  width: 20px;
  height: 20px;
  background-color: black;
`;
const EditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem;
  border: 1px solid black;
  padding: 1rem;
`;
interface EditorProps {
  handleDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
}

function DndEditor({ handleDragStart, handleDragEnd }: EditorProps) {
  return (
    <EditorWrapper>
      <Rect
        draggable={true}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      />
    </EditorWrapper>
  );
}

export default DndEditor;
