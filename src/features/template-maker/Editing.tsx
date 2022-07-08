import styled from "@emotion/styled";
import React from "react";

import {
  EditingElement,
  EditingEventHandlers,
  ControllerEventHandlers,
} from "./Container";
import EditingOuterElement from "./EditingOuterElement";

const EditingPaper = styled.div`
  width: 70%;
  height: 100vh;
  overflow: scroll;
  padding: 1rem;
  display: flex;
  flex-direction: column;

  align-items: center;
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
      {elements.map(({ id, option, isExpanded, isDraggable }) => (
        <EditingOuterElement
          key={id}
          id={id}
          option={option}
          isExpanded={isExpanded}
          isDraggble={isDraggable}
          contorllerEventHandlers={contorllerEventHandlers}
          handleDragEnterElement={editingEventHandlers.createDragEnterElement(
            id
          )}
          handleDragEndElement={editingEventHandlers.handleDragEndElement}
        />
      ))}
    </EditingPaper>
  );
}

export default Editing;
