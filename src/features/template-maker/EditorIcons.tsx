import styled from "@emotion/styled";

import { EditableOption } from "./types";

const Icons = styled.div`
  margin: 1rem;
`;
const RectangleIcon = styled(Icons)`
  width: 30px;
  height: 30px;
  background-color: black;
`;
const TriangleIcon = styled(Icons)`
  width: 0;
  height: 0;
  border-bottom: calc(15px * 1.73) solid black;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
`;
const CircleIcon = styled(Icons)`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: black;
`;

interface EditorIconProps {
  createDragStartHandler: (
    selectable: EditableOption
  ) => (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
}
function EditorIcons({
  createDragStartHandler,
  handleDragEnd,
}: EditorIconProps) {
  return (
    <div>
      <RectangleIcon
        draggable="true"
        onDragStart={createDragStartHandler("rectangle")}
        onDragEnd={handleDragEnd}
      />
      <TriangleIcon
        draggable="true"
        onDragStart={createDragStartHandler("triangle")}
        onDragEnd={handleDragEnd}
      />
      <CircleIcon
        draggable="true"
        onDragStart={createDragStartHandler("circle")}
        onDragEnd={handleDragEnd}
      />
    </div>
  );
}

export default EditorIcons;
