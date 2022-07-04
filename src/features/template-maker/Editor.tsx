import styled from "@emotion/styled";
import React from "react";

import { EditorElement } from "./Container";

const Wrapper = styled.div`
  width: 30%;
  border: 1px solid black;
`;

interface EditorProps {
  elements: EditorElement[];
  createDragStartHandler: (option: string) => () => void;
  handleDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
}
function Editor({
  elements,
  createDragStartHandler,
  handleDragEnd,
}: EditorProps) {
  return (
    <Wrapper>
      {elements.map((elem, idx) => (
        <div
          key={idx}
          draggable="true"
          onDragStart={createDragStartHandler(elem.option)}
          onDragEnd={handleDragEnd}
        >
          {elem.option}
        </div>
      ))}
    </Wrapper>
  );
}

export default Editor;
