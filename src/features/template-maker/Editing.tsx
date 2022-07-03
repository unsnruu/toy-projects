import styled from "@emotion/styled";
import React from "react";

import { EditingItemType } from "./types";
import EditingItemWrapper from "./EditingItem";

const Wrapper = styled.div`
  width: 70%;
  border: 1px solid black;
  padding: 1rem;
`;

interface EditingProps {
  editingItems: EditingItemType[];
  handlerDragEnterOuterspace: (e: React.DragEvent<HTMLDivElement>) => void;
  createHandleDragEnterById: (
    id: string
  ) => (e: React.DragEvent<HTMLDivElement>) => void;
  createHandleDragLeaveById: (
    id: string
  ) => (e: React.DragEvent<HTMLDivElement>) => void;
}
function Editing({
  editingItems,
  handlerDragEnterOuterspace,
  createHandleDragEnterById,
  createHandleDragLeaveById,
}: EditingProps) {
  return (
    <Wrapper onDragEnter={handlerDragEnterOuterspace}>
      {editingItems.map(({ id, renderTo }) => (
        <EditingItemWrapper
          key={id}
          handleDragEnter={createHandleDragEnterById(id)}
          handleDragLeave={createHandleDragLeaveById(id)}
          renderTo={renderTo}
        />
      ))}
    </Wrapper>
  );
}

export default Editing;
