import styled from "@emotion/styled";
import React from "react";

import { EditableOption } from "./Container";
import EditorIcons from "./EditorIcons";

const Wrapper = styled.div`
  width: 30%;
  border: 1px solid black;
`;

interface EditorProps {
  createDragStartHandler: (
    selectable: EditableOption
  ) => (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
}
function Editor({ createDragStartHandler, handleDragEnd }: EditorProps) {
  return (
    <Wrapper>
      <div id="editor-item">
        <EditorIcons
          createDragStartHandler={createDragStartHandler}
          handleDragEnd={handleDragEnd}
        />
      </div>
    </Wrapper>
  );
}

export default Editor;
