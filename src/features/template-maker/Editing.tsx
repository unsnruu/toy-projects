import styled from "@emotion/styled";
import React from "react";

import { EditingItemType } from "./types";
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
        <EditingItem
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

const RectangleItem = styled.div`
  width: 100px;
  height: 100px;
  background-color: black;
`;
const TriangleItem = styled.div`
  width: 0;
  height: 0;
  border-bottom: calc(50px * 1.73) solid black;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
`;
const CircleItem = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: black;
`;
const EmptyItem = styled.div`
  height: 100px;
  background-color: gray;
`;

interface EditingItemProps extends Omit<EditingItemType, "id"> {
  handleDragEnter: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
}
function EditingItem({
  renderTo,
  handleDragEnter,
  handleDragLeave,
}: EditingItemProps) {
  switch (renderTo) {
    case "circle":
      return <CircleItem />;
    case "rectangle":
      return <RectangleItem />;
    case "triangle":
      return <TriangleItem />;
    default:
      return (
        <EmptyItem onDragEnter={handleDragEnter} onDragLeave={handleDragLeave}>
          Empty
        </EmptyItem>
      );
  }
}
