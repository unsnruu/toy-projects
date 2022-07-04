import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { v4 as uuidv4 } from "uuid";

import Editor from "./Editor";
import Editing from "./Editing";

const Wrapper = styled.div`
  display: flex;
`;

export interface EditingElement {
  id: string;
  isExpanded: boolean;
  content: string;
}
const initEditingElements: EditingElement[] = [
  { id: uuidv4(), isExpanded: false, content: "1" },
  { id: uuidv4(), isExpanded: false, content: "2" },
  { id: uuidv4(), isExpanded: false, content: "3" },
];

export interface EditorElement {
  option: string;
}
const initEditorElements: EditorElement[] = [
  { option: "A" },
  { option: "B" },
  { option: "C" },
];

function Container() {
  const [editingElements, setEditingElements] = useState(initEditingElements);
  const [editorElements, setEditorElements] = useState(initEditorElements);

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedElement, setselectedElement] = useState<string | null>(null);

  useEffect(() => {
    console.log(selectedOption);
    console.log(selectedElement);
  }, [selectedElement, selectedOption]);

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
      content: selectedOption ? selectedOption : "temp",
    };
    newEditingElements.splice(idx + 1, 0, newElement);

    setEditingElements(newEditingElements);
  };
  //Event Handlers
  const eventHandlersOnEditor = {
    createDragStartHandler: (option: string) => () => {
      console.log(`drag start`);
      setSelectedOption(option);
    },
    handleDragEnd: () => {
      console.log("drag end");
      setAllIsExpandedFalse();

      if (selectedElement && selectedOption) {
        addEditingItemNextTo(selectedElement);
      }

      setSelectedOption(null);
    },
  };
  const eventHandlersOnEditing = {
    handleDragEnterEditing: () => {
      console.log(`Drag entered in Editing`);
      setAllIsExpandedFalse();
      setselectedElement(null);
    },
    createDragEnterElementHandler:
      (id: string) => (e: React.DragEvent<HTMLDivElement>) => {
        console.log(`Drag entered in element ${id}`);
        e.stopPropagation();
        setOnlyElement(id)(true);
        setselectedElement(id);
      },
  };

  return (
    <Wrapper>
      <Editing
        elements={editingElements}
        handleDragEnterEditing={eventHandlersOnEditing.handleDragEnterEditing}
        createDragEnterElementHandler={
          eventHandlersOnEditing.createDragEnterElementHandler
        }
      />
      <Editor
        elements={editorElements}
        createDragStartHandler={eventHandlersOnEditor.createDragStartHandler}
        handleDragEnd={eventHandlersOnEditor.handleDragEnd}
      />
    </Wrapper>
  );
}

export default Container;
