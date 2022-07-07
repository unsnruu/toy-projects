import styled from "@emotion/styled";
import React from "react";

import { EditorElement } from "./Container";
import EditorIcons from "./EditorIcons";
import { Options } from "./types";

const Wrapper = styled.div`
  width: 30%;
  border: 1px solid black;
`;

interface EditorProps {
  elements: EditorElement[];
  createDragStartHandler: (option: Options) => () => void;
  handleDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
}
function Editor({
  elements,
  createDragStartHandler,
  handleDragEnd,
}: EditorProps) {
  return (
    <Wrapper>
      {elements.map(({ option, title }) => (
        <EditorIcons
          key={option}
          option={option}
          title={title}
          handleDragStart={createDragStartHandler(option)}
          handleDragEnd={handleDragEnd}
        />
      ))}
    </Wrapper>
  );
}

export default Editor;
