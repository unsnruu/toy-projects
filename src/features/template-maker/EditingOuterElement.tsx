import React from "react";
import styled from "@emotion/styled";

import EditingInnerElement from "./EditingInnterElement";

const Wrapper = styled.div`
  border: 1px solid black;
`;
//유저가 들어왔음을 어떻게 알 수 있는가?
interface EditingOuterElementProps {
  content: string;
  isExpanded: boolean;
  handleDragEnterElement: (e: React.DragEvent<HTMLDivElement>) => void;
}
function EditingOuterElement({
  isExpanded,
  content,
  handleDragEnterElement,
}: EditingOuterElementProps) {
  return (
    <Wrapper onDragEnter={handleDragEnterElement}>
      <EditingInnerElement content={content} isExpanded={isExpanded} />
    </Wrapper>
  );
}

export default EditingOuterElement;
