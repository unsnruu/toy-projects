import React, { createContext, useState } from "react";
import styled from "@emotion/styled";

import Editor from "./Editor";
import Editing from "./Editing";

const Wrapper = styled.div`
  display: flex;
`;
export type EditorOption = "rectangle" | "circle" | "triangle";
interface EditorSelection {
  selectedOption: EditorOption;
  selectedItem: string | null;
}
interface EditorItem {
  option: EditorOption;
}

const initEditorSelection: EditorSelection = {
  selectedOption: "rectangle",
  selectedItem: null,
};
const initEditorItems: EditorItem[] = [
  { option: "circle" },
  { option: "rectangle" },
  { option: "triangle" },
];
export const CanvasContext =
  createContext<EditorSelection>(initEditorSelection);

function CanvasContainer() {
  const [editorSelection, setEditorSelection] =
    useState<EditorSelection>(initEditorSelection);
  const [editorItems, setEditorItems] = useState<EditorItem[]>(initEditorItems);

  const createDragStartHandler =
    (selectedOption: EditorOption) => (e: React.DragEvent<HTMLDivElement>) => {
      console.log(`editor selectedOption ${selectedOption} option`);
      setEditorSelection((prev) => ({ ...prev, selectedOption }));
    };
  const createDragEnterHandler =
    (id: string) => (e: React.DragEvent<HTMLDivElement>) => {
      console.log(``);
    };
  const handleDragLeave = () => {};

  return (
    <Wrapper>
      <CanvasContext.Provider value={editorSelection}>
        <Editing />
        <Editor createDragStartHandler={createDragStartHandler} />
      </CanvasContext.Provider>
    </Wrapper>
  );
}
export default CanvasContainer;
