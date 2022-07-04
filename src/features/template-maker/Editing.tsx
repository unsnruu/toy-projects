import styled from "@emotion/styled";
import React from "react";

import { EditingElement } from "./Container";
import EditingOuterElement from "./EditingOuterElement";

const EditingWrapper = styled.div`
  width: 70%;
  border: 1px solid black;
  padding: 1rem;
`;

interface EditingProps {
  elements: EditingElement[];
  handleDragEnterEditing: () => void;
  createDragEnterElementHandler: (
    id: string
  ) => (e: React.DragEvent<HTMLDivElement>) => void;
}

function Editing({
  elements,
  handleDragEnterEditing,
  createDragEnterElementHandler,
}: EditingProps) {
  return (
    <EditingWrapper onDragEnter={handleDragEnterEditing}>
      {elements.map(({ id, content, isExpanded }) => (
        <EditingOuterElement
          key={id}
          content={content}
          isExpanded={isExpanded}
          handleDragEnterElement={createDragEnterElementHandler(id)}
        />
      ))}
    </EditingWrapper>
  );
}

export default Editing;
