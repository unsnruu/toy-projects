import styled from "@emotion/styled";
import React from "react";

import { EditorOption } from "./CanvasContainer";

const Wrapper = styled.div`
  padding: 1rem;
  width: 40%;
  background-color: gray;
`;
const EditorIcon = styled.div`
  margin-bottom: 0.5rem;
`;
const RectagleIcon = styled(EditorIcon)`
  width: 20px;
  height: 20px;
  background-color: black;
`;
const CircleIcon = styled(EditorIcon)`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: black;
`;
const TriangleIcon = styled(EditorIcon)`
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: calc(10px * 1.73) solid black;
`;
interface EditorProps {
  createDragStartHandler: (
    option: EditorOption
  ) => (e: React.DragEvent<HTMLDivElement>) => void;
}
function Editor({ createDragStartHandler }: EditorProps) {
  return (
    <Wrapper>
      <RectagleIcon
        draggable="true"
        onDragStart={createDragStartHandler("rectangle")}
      />
      <CircleIcon
        draggable="true"
        onDragStart={createDragStartHandler("circle")}
      />
      <TriangleIcon
        draggable="true"
        onDragStart={createDragStartHandler("triangle")}
      />
    </Wrapper>
  );
}

export default Editor;
