import styled from "@emotion/styled";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { EditingElement } from "./Container";
import EditingOuterElement from "./EditingOuterElement";

const EditingWrapper = styled.div`
  width: 70%;
  border: 1px solid black;
  padding: 1rem;
`;

interface EditingProps {
  editingElements: EditingElement[];
  handleDragEnterEditing: () => void;
  createDragEnterElementHandler: (
    id: string
  ) => (e: React.DragEvent<HTMLDivElement>) => void;
}

function Editing({
  editingElements,
  handleDragEnterEditing,
  createDragEnterElementHandler,
}: EditingProps) {
  return (
    <EditingWrapper onDragEnter={handleDragEnterEditing}>
      {editingElements.map(({ id, isExpanded }) => (
        <EditingOuterElement
          key={id}
          isExpanded={isExpanded}
          handleDragEnterElement={createDragEnterElementHandler(id)}
        />
      ))}
    </EditingWrapper>
  );
}

export default Editing;
