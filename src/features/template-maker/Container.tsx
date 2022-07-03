import styled from "@emotion/styled";
import React, { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Editor from "./Editor";
import Editing from "./Editing";

export type EditableOption = "rectangle" | "triangle" | "circle";
interface GlobalSelection {
  selectedIcon: EditableOption;
  selectedItem: string | null;
}

const Wrapper = styled.div`
  display: flex;
`;
const initGlobalSelection: GlobalSelection = {
  selectedIcon: "rectangle",
  selectedItem: null,
};
const TeamplateMakerContext =
  createContext<GlobalSelection>(initGlobalSelection);

export interface EditingItemType {
  id: string;
  option: EditableOption | null;
}
const initEditingItems: EditingItemType[] = [
  { id: uuidv4(), option: null },
  { id: uuidv4(), option: null },
  { id: uuidv4(), option: null },
];
function Container() {
  const [globalSelection, setGlobalSelection] =
    useState<GlobalSelection>(initGlobalSelection);
  const [editingItems, setEditingItems] =
    useState<EditingItemType[]>(initEditingItems);
  //Event Handlers
  const createDragStartHandler =
    (selectedIcon: EditableOption) => (e: React.DragEvent<HTMLDivElement>) => {
      console.log(`globally selected ${selectedIcon}`);
      setGlobalSelection((prev) => ({ ...prev, selectedIcon }));
    };
  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    console.log("drag end");
    //선택되어있던 엘리먼트를 선택된 컴포넌트로 교체하기
    setEditingItems((items) =>
      items.map((item) => {
        if (item.id === globalSelection.selectedItem) {
          item.option = globalSelection.selectedIcon;
        }
        return item;
      })
    );
  };
  const addNextItemsById = (id: string) => {
    const idx = editingItems.findIndex((item) => item.id === id);
    if (idx === -1) throw new Error("id에 해당하는 아이템이 없습니다.");

    const front = editingItems.slice(0, idx + 1);
    const newItem: EditingItemType = { id: uuidv4(), option: null };
    const back = editingItems.slice(idx + 1);
    const newEditingItems = front.concat(newItem).concat(back);

    setEditingItems(newEditingItems);
  };
  const deleteNextItemById = (id: string) => {
    const idx = editingItems.findIndex((item) => item.id === id);
    if (idx === -1) throw new Error("id에 해당하는 아이템이 없습니다.");

    const front = editingItems.slice(0, idx + 1);
    const back = editingItems.slice(idx + 2);
    const newEditingItems = front.concat(back);

    setEditingItems(newEditingItems);
  };
  const handleDragEnterOuter = (e: React.DragEvent<HTMLDivElement>) => {
    console.log(`Icon entered in outer space`);
    setGlobalSelection((selection) => ({ ...selection, selectedItem: null }));
  };
  const createDragEnterItem =
    (id: string) => (e: React.DragEvent<HTMLDivElement>) => {
      console.log("Icon has entered in item");
      e.stopPropagation();
      addNextItemsById(id);
      setGlobalSelection((selection) => ({ ...selection, selectedItem: id }));
    };
  const createHandleDragLeaveById =
    (id: string) => (e: React.DragEvent<HTMLDivElement>) => {
      //id에 해당되는 item을 globalSelection에 해당되는 값으로 치환하가.
      deleteNextItemById(id);
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
