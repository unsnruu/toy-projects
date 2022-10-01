import React from "react";
import styled from "@emotion/styled";

import { Options } from "./types";
import EditingInnerElement from "./EditingInnerElement";
import ElementController from "./ElementController";
import { ControllerEventHandlers } from "./Container";

const Wrapper = styled.div`
  margin-bottom: 1rem;
  width: 70%;
  &:hover div {
    opacity: 1;
  }
`;

interface EditingOuterElementProps {
  id: string;
  option: Options;
  isExpanded: boolean;
  isDraggble: boolean;
  handleDragEnterElement: (e: React.DragEvent<HTMLDivElement>) => void;
  contorllerEventHandlers: ControllerEventHandlers;
  handleDragEndElement: (id: string) => () => void;
}
function EditingOuterElement({
  id,
  option,
  isExpanded,
  isDraggble,
  contorllerEventHandlers,
  handleDragEnterElement,
  handleDragEndElement,
}: EditingOuterElementProps) {
  return (
    <Wrapper
      onDragEnter={handleDragEnterElement}
      draggable={true}
      onDragEnd={handleDragEndElement(id)}
    >
      <ElementController
        id={id}
        contorllerEventHandlers={contorllerEventHandlers}
      />
      <EditingInnerElement option={option} isExpanded={isExpanded} />
    </Wrapper>
  );
}

export default EditingOuterElement;
