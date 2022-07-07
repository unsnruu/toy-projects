import styled from "@emotion/styled";
import React from "react";

import {
  EditingElement,
  EditingEventHandlers,
  ControllerEventHandlers,
} from "./Container";
import EditingOuterElement from "./EditingOuterElement";
import ElementController from "./ElementController";

const EditingPaper = styled.div`
  width: 70%;
  height: 100vh;
  overflow: scroll;
  padding: 1rem;
`;

interface EditingProps {
  elements: EditingElement[];
  editingEventHandlers: EditingEventHandlers;
  contorllerEventHandlers: ControllerEventHandlers;
}

function Editing({
  elements,
  editingEventHandlers,
  contorllerEventHandlers,
}: EditingProps) {
  return (
    <EditingPaper onDragEnter={editingEventHandlers.handleDragEnterEditing}>
      {elements.map(({ id, content, isExpanded, isDraggable }) => (
        <ElementController
          key={id}
          id={id}
          contorllerEventHandlers={contorllerEventHandlers}
        >
          <EditingOuterElement
            content={content}
            isExpanded={isExpanded}
            isDraggble={isDraggable}
            handleDragEnterElement={editingEventHandlers.createDragEnterElement(
              id
            )}
          />
        </ElementController>
      ))}
    </EditingPaper>
  );
}

export default Editing;
