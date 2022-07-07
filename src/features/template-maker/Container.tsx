import React, { useState } from "react";
import styled from "@emotion/styled";
import { v4 as uuidv4 } from "uuid";

import Editor from "./Editor";
import Editing from "./Editing";
import { Options } from "./types";

const Wrapper = styled.div`
  display: flex;
`;

export interface EditingElement {
  id: string;
  isExpanded: boolean;
  isDraggable: boolean;
  content: Options;
}
const initEditingElements: EditingElement[] = [
  { id: uuidv4(), isExpanded: false, isDraggable: false, content: "button" },
  { id: uuidv4(), isExpanded: false, isDraggable: false, content: "image" },
  { id: uuidv4(), isExpanded: false, isDraggable: false, content: "text" },
];

export interface EditorElement {
  option: Options;
  title: string;
}
const initEditorElements: EditorElement[] = [
  { option: "text", title: "텍스트" },
  { option: "image", title: "이미지" },
  { option: "button", title: "버튼" },
];

export interface EditingEventHandlers {
  handleDragEnterEditing: () => void;
  createDragEnterElement: (
    id: string
  ) => (e: React.DragEvent<HTMLDivElement>) => void;
}
export interface ControllerEventHandlers {
  createClickPrevHandler: (id: string) => () => void;
  createClickNextHandle: (id: string) => () => void;
  createDragStartMoveHandle: (id: string) => () => void;
  createClickCopyHandle: (id: string) => () => void;
  createClickDeleteHandle: (id: string) => () => void;
}

function Container() {
  const [editingElements, setEditingElements] = useState(initEditingElements);
  const [editorElements, setEditorElements] = useState(initEditorElements);

  const [selectedOption, setSelectedOption] = useState<Options>("button");
  const [selectedElement, setselectedElement] = useState<string | null>(null);

  const setOnlyElement = (id: string) => (value: boolean) => {
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
  const addEditingItemNextTo = (id: string) => {
    const newEditingElements = [...editingElements];
    const idx = newEditingElements.findIndex((elem) => elem.id === id);

    if (idx < 0) return;
    const newElement: EditingElement = {
      id: uuidv4(),
      isExpanded: false,
      isDraggable: false,
      content: selectedOption ? selectedOption : "text",
    };
    newEditingElements.splice(idx + 1, 0, newElement);

    setEditingElements(newEditingElements);
  };

  //Event Handlers
  const editorEvent = {
    createDragStartHandler: (option: Options) => () => {
      console.log(`drag start`);
      setSelectedOption(option);
    },
    handleDragEnd: () => {
      console.log("drag end");
      setAllIsExpandedFalse();

      if (selectedElement && selectedOption) {
        addEditingItemNextTo(selectedElement);
      }

      setSelectedOption("button");
    },
  };
  const editingEventHandlers: EditingEventHandlers = {
    handleDragEnterEditing: () => {
      console.log(`Drag entered in Editing`);
      setAllIsExpandedFalse();
      setselectedElement(null);
    },
    createDragEnterElement:
      (id: string) => (e: React.DragEvent<HTMLDivElement>) => {
        console.log(`Drag entered in element ${id}`);
        e.stopPropagation();
        setOnlyElement(id)(true);
        setselectedElement(id);
      },
  };
  const controllerEventHandlers: ControllerEventHandlers = {
    createClickPrevHandler: (id: string) => () => {
      console.log(`you clicked ${id}`);
    },
    createClickNextHandle: (id: string) => () => {},
    createDragStartMoveHandle: (id: string) => () => {
      console.log(`Drag start on controller`);
      setEditingElements((elements) =>
        elements.map((elem) => {
          if (elem.id === id) {
            elem.isDraggable = true;
          }
          return elem;
        })
      );
      // 어떻게 진행해야 하려나 ?
    },
    createClickCopyHandle: (id: string) => () => {},
    createClickDeleteHandle: (id: string) => () => {},
  };

  return (
    <Wrapper>
      <Editing
        elements={editingElements}
        editingEventHandlers={editingEventHandlers}
        contorllerEventHandlers={controllerEventHandlers}
      />
      <Editor
        elements={editorElements}
        createDragStartHandler={editorEvent.createDragStartHandler}
        handleDragEnd={editorEvent.handleDragEnd}
      />
    </Wrapper>
  );
}

export default Container;
