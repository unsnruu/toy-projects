import React, { useState } from "react";
import styled from "@emotion/styled";
import { v4 as uuidv4 } from "uuid";

import Editor from "./Editor";
import Editing from "./Editing";
import { Options } from "./types";
import { swap } from "./utils";

const Wrapper = styled.div`
  display: flex;
`;

export interface EditingElement {
  id: string;
  isExpanded: boolean;
  isDraggable: boolean;
  option: Options;
}
const initEditingElements: EditingElement[] = [
  { id: uuidv4(), isExpanded: false, isDraggable: false, option: "button" },
  { id: uuidv4(), isExpanded: false, isDraggable: false, option: "image" },
  { id: uuidv4(), isExpanded: false, isDraggable: false, option: "text" },
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
  handleDragEndElement: (id: string) => () => void;
}
export interface ControllerEventHandlers {
  createClickPrevHandler: (id: string) => () => void;
  createClickNextHandle: (id: string) => () => void;
  createClickCopyHandle: (id: string) => () => void;
  createClickDeleteHandle: (id: string) => () => void;
}

function Container() {
  const [editingElements, setEditingElements] = useState(initEditingElements);
  const editorElements = initEditorElements;

  const [selectedOption, setSelectedOption] = useState<Options>("button");
  const [selectedElement, setselectedElement] = useState<string | null>(null);

  const setOnlyElement = (id: string) => (value: boolean) => {
    setEditingElements((elements) => {
      const newElements = elements.map((elem) => {
        const newElement = { ...elem };
        newElement.isExpanded = newElement.id === id ? value : !value;

        return newElement;
      });
      return newElements;
    });
  };
  const setAllExpandedToFalse = () => {
    setEditingElements((elements) => {
      const newElements = elements.map((elem) => ({
        ...elem,
        isExpanded: false,
      }));
      return newElements;
    });
  };
  const addEditingItemNextTo = (id: string) => {
    setEditingElements((elements) => {
      const newElements = elements.slice(0);
      const idx = newElements.findIndex((elem) => elem.id === id);

      if (idx >= 0) {
        const newElement: EditingElement = {
          id: uuidv4(),
          isExpanded: false,
          isDraggable: false,
          option: selectedOption ? selectedOption : "text",
        };
        newElements.splice(idx + 1, 0, newElement);
      }
      return newElements;
    });
  };

  //Event Handlers
  const editorEventHandlers = {
    createDragStartHandler: (option: Options) => () => {
      setSelectedOption(option);
    },
    handleDragEnd: () => {
      setAllExpandedToFalse();

      if (selectedElement && selectedOption) {
        addEditingItemNextTo(selectedElement);
      }
      setSelectedOption("text");
    },
  };
  const editingEventHandlers: EditingEventHandlers = {
    handleDragEnterEditing: () => {
      console.log(`Drag entered in Editing`);

      setAllExpandedToFalse();
      setselectedElement(null);
    },
    createDragEnterElement:
      (id: string) => (e: React.DragEvent<HTMLDivElement>) => {
        console.log(`Drag entered in element ${id}`);

        e.stopPropagation();

        setOnlyElement(id)(true);
        setselectedElement(id);
      },
    handleDragEndElement: (id: string) => () => {
      setAllExpandedToFalse();

      setEditingElements((elements) => {
        let newElements = [...elements];
        const current = newElements.find((elem) => elem.id === id);
        const targetIdx = newElements.findIndex(
          (elem) => elem.id === selectedElement
        );
        //! 리팩토링 필요할 거 같은데
        //끼워넣기?
        if (current && targetIdx >= 0) {
          newElements = newElements.filter(
            (elem) => elem.id !== id
          ) as EditingElement[];
          newElements.splice(targetIdx, 0, current);
        }
        return newElements;
      });
    },
  };
  const controllerEventHandlers: ControllerEventHandlers = {
    createClickPrevHandler: (id: string) => () => {
      const newElements = [...editingElements];
      const idx = newElements.findIndex((elem) => elem.id === id);

      if (idx <= 0) return;

      swap(newElements, idx, idx - 1);
      setEditingElements(newElements);
    },
    createClickNextHandle: (id: string) => () => {
      const newElements = [...editingElements];
      const idx = newElements.findIndex((elem) => elem.id === id);

      if (idx === -1 || idx >= newElements.length - 1) return;

      swap(newElements, idx, idx + 1);
      setEditingElements(newElements);
    },
    createClickCopyHandle: (id: string) => () => {},
    createClickDeleteHandle: (id: string) => () => {
      const newElements = editingElements.filter((elem) => elem.id !== id);
      setEditingElements(newElements);
    },
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
        createDragStartHandler={editorEventHandlers.createDragStartHandler}
        handleDragEnd={editorEventHandlers.handleDragEnd}
      />
    </Wrapper>
  );
}

export default Container;
