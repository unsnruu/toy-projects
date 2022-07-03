import styled from "@emotion/styled";

import { EditingItemType } from "./types";

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
function EditingItemWrapper({
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

export default EditingItemWrapper;
