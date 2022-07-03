import styled from "@emotion/styled";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { EditableOption } from "./types";
import Editor from "./Editor";
import Editing from "./Editing";

const Wrapper = styled.div`
  display: flex;
`;

export interface EditingElement {
  id: string;
  isExpanded: boolean;
}
const initEditingElements: EditingElement[] = [
  { id: uuidv4(), isExpanded: false },
  { id: uuidv4(), isExpanded: false },
  { id: uuidv4(), isExpanded: false },
];

function Container() {
  const [editingElements, setEditingElements] =
    useState<EditingElement[]>(initEditingElements);

  const setOnlyIsExpandedTrue = (id: string) => (value: boolean) => {
    const newEditingElements = editingElements.map((elem) => {
      if (elem.id === id) elem.isExpanded = value;
      else elem.isExpanded = !value;
      return elem;
    });
    setEditingElements(newEditingElements);
  };
  const setAllIsExpandedFalse = () => {
    const newEditingElements = editingElements.map((elem) => {
      elem.isExpanded = false;
      return elem;
    });
    setEditingElements(newEditingElements);
  };
  //Event Handlers
  const createDragStartHandler =
    (selectedOption: EditableOption) =>
    (e: React.DragEvent<HTMLDivElement>) => {
      console.log(`globally selected ${selectedOption}`);
    };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    console.log("drag end");
    setAllIsExpandedFalse();
  };

  const handleDragEnterEditing = () => {
    console.log(`Drag entered in Editing`);
    setAllIsExpandedFalse();
  };
  const createDragEnterElementHandler =
    (id: string) => (e: React.DragEvent<HTMLDivElement>) => {
      console.log(`Drag entered in element ${id}`);
      e.stopPropagation();

      setOnlyIsExpandedTrue(id)(true);
    };

  return (
    <Wrapper>
      <Editing
        editingElements={editingElements}
        handleDragEnterEditing={handleDragEnterEditing}
        createDragEnterElementHandler={createDragEnterElementHandler}
      />
      <Editor
        createDragStartHandler={createDragStartHandler}
        handleDragEnd={handleDragEnd}
      />
    </Wrapper>
  );
}

export default Container;

// const addNextItemsById = (id: string) => {
//   const idx = editingItems.findIndex((item) => item.id === id);
//   if (idx === -1) throw new Error("id에 해당하는 아이템이 없습니다.");

//   const front = editingItems.slice(0, idx + 1);
//   const newItem: EditingItemType = {
//     id: uuidv4(),
//     renderTo: "empty",
//   };
//   const back = editingItems.slice(idx + 1);
//   const newEditingItems = front.concat(newItem).concat(back);

//   setEditingItems(newEditingItems);
// };
// const deleteNextItemById = (id: string) => {
//   const idx = editingItems.findIndex((item) => item.id === id);
//   if (idx === -1) throw new Error("id에 해당하는 아이템이 없습니다.");

//   const front = editingItems.slice(0, idx + 1);
//   const back = editingItems.slice(idx + 2);
//   const newEditingItems = front.concat(back);

//   setEditingItems(newEditingItems);
// };
