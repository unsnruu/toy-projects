import styled from "@emotion/styled";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { EditingItemType } from "./types";
import EditingOuterElement from "./EditingOuterElement";

const EditingWrapper = styled.div`
  width: 70%;
  border: 1px solid black;
  padding: 1rem;
`;

interface EditingElement {
  id: string;
  isExpanded: boolean;
}
interface EditingProps {}

function Editing({}: EditingProps) {
  const [editingElements, setEditingElements] = useState<EditingElement[]>();

  const [isDraggedIn, setIsDraggedIn] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDragEnterEditing = () => {
    console.log(`Drag entered in Editing`);
    setIsDraggedIn(false);
    setIsExpanded(false);
  };
  const handleDragEnterElement = (e: React.DragEvent<HTMLDivElement>) => {
    console.log(`Drag entered in element`);
    e.stopPropagation();

    setIsDraggedIn(true);
    setIsExpanded(true);
  };

  return (
    <EditingWrapper onDragEnter={handleDragEnterEditing}>
      <EditingOuterElement
        isExpanded={isExpanded}
        handleDragEnterElement={handleDragEnterElement}
      />
      <EditingOuterElement
        isExpanded={isExpanded}
        handleDragEnterElement={handleDragEnterElement}
      />
      <EditingOuterElement
        isExpanded={isExpanded}
        handleDragEnterElement={handleDragEnterElement}
      />
    </EditingWrapper>
  );
}

export default Editing;
