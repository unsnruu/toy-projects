import React from "react";
import styled from "@emotion/styled";

import { Options } from "./types";
import EditingInnerElement from "./EditingInnterElement";

const Wrapper = styled.div`
  margin-bottom: 1rem;
  width: 100%;
`;

interface EditingOuterElementProps {
  content: Options;
  isExpanded: boolean;
  isDraggble: boolean;
  handleDragEnterElement: (e: React.DragEvent<HTMLDivElement>) => void;
}
function EditingOuterElement({
  content,
  isExpanded,
  isDraggble,
  handleDragEnterElement,
}: EditingOuterElementProps) {
  return (
    <Wrapper onDragEnter={handleDragEnterElement} draggable={isDraggble}>
      <EditingInnerElement content={content} isExpanded={isExpanded} />
    </Wrapper>
  );
}

export default EditingOuterElement;
