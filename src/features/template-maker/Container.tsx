import styled from "@emotion/styled";
import React, { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { MakerSelection, EditableOption, EditingItemType } from "./types";
import Editor from "./Editor";
import Editing from "./Editing";

const Wrapper = styled.div`
  display: flex;
`;
const initGlobalSelection: MakerSelection = {
  selectedOption: "rectangle",
  selectedItem: null,
};
const TeamplateMakerContext =
  createContext<MakerSelection>(initGlobalSelection);

const initEditingItems: EditingItemType[] = [
  { id: uuidv4(), renderTo: "empty" },
  { id: uuidv4(), renderTo: "empty" },
  { id: uuidv4(), renderTo: "empty" },
];
function Container() {
  const [globalSelection, setGlobalSelection] =
    useState<MakerSelection>(initGlobalSelection);
  const [editingItems, setEditingItems] =
    useState<EditingItemType[]>(initEditingItems);
  //Event Handlers
  const createDragStartHandler =
    (selectedOption: EditableOption) =>
    (e: React.DragEvent<HTMLDivElement>) => {
      console.log(`globally selected ${selectedOption}`);
      setGlobalSelection((prev) => ({ ...prev, selectedOption }));
    };
  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    console.log("drag end");
    //선택되어있던 엘리먼트를 선택된 컴포넌트로 교체하기
    setEditingItems((items) =>
      items.map((item) => {
        if (item.id === globalSelection.selectedItem) {
          item.renderTo = globalSelection.selectedOption;
        }
        return item;
      })
    );
  };

  const handleDragEnterOuter = (e: React.DragEvent<HTMLDivElement>) => {
    console.log(`Icon entered in outer space`);
    setGlobalSelection((selection) => ({ ...selection, selectedItem: null }));
  };
  const createDragEnterItem =
    (id: string) => (e: React.DragEvent<HTMLDivElement>) => {
      console.log(`Icon has entered in item ${id}`);
      e.stopPropagation();
      // addNextItemsById(id);
      setGlobalSelection((selection) => ({ ...selection, selectedItem: id }));
    };
  const createHandleDragLeaveById =
    (id: string) => (e: React.DragEvent<HTMLDivElement>) => {
      //id에 해당되는 item을 globalSelection에 해당되는 값으로 치환하가.
      // deleteNextItemById(id);
    };
  return (
    <TeamplateMakerContext.Provider value={globalSelection}>
      <Wrapper>
        <Editing
          editingItems={editingItems}
          handlerDragEnterOuterspace={handleDragEnterOuter}
          createHandleDragEnterById={createDragEnterItem}
          createHandleDragLeaveById={createHandleDragLeaveById}
        />
        <Editor
          createDragStartHandler={createDragStartHandler}
          handleDragEnd={handleDragEnd}
        />
      </Wrapper>
    </TeamplateMakerContext.Provider>
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
