import React, { useState } from "react";
import styled from "@emotion/styled";

import EditingInnerElement from "./EditingInnterElement";

const Wrapper = styled.div`
  border: 1px solid black;
  height: 10rem;
`;
//유저가 들어왔음을 어떻게 알 수 있는가?
interface EditingOuterElementProps {
  isExpanded: boolean;
  handleDragEnterElement: (e: React.DragEvent<HTMLDivElement>) => void;
}
function EditingOuterElement({
  isExpanded,
  handleDragEnterElement,
}: EditingOuterElementProps) {
  return (
    <Wrapper onDragEnter={handleDragEnterElement}>
      <EditingInnerElement isExpanded={isExpanded} />
    </Wrapper>
  );
}

export default EditingOuterElement;
