import { useState, useEffect } from "react";

import DnDEditor from "./DnDEditor";
import DNDGraph from "./DnDCanvas";

export type Shape = "rectangle" | "triangle" | "circle";
export type Color = "black" | "red" | "green" | "blue";
export interface EditorSelection {
  shape: Shape;
  color: Color;
}
export interface Element {
  id: number;
  isVisible: boolean;
  isMounted: boolean;
  shape: Shape;
}
const initElements: Element[] = Array.from({ length: 9 }, (_, idx) => ({
  id: idx,
  isMounted: false,
  isVisible: false,
  shape: "rectangle",
}));

function DnDContainer() {
  const [editorSelection, setEditorSelection] = useState<EditorSelection>({
    shape: "rectangle",
    color: "black",
  });

  const [elements, setElements] = useState<Element[]>(initElements);
  const [isDragging, setIsDragging] = useState(false);
  const [selected, setSelected] = useState<null | Number>(null);

  useEffect(() => {
    if (Number.isNaN(selected) || isDragging) return;
    console.log("working");

    setElements((prevElements) =>
      prevElements.map((elem) => {
        if (elem.id === selected) {
          elem.isMounted = true;
        }
        return elem;
      })
    );
  }, [selected, isDragging]);

  //leave out이랑 drag enter이랑 이벤트가 겹치게 일어난다.
  const handleDragEnter =
    (id: Number) => (event: React.DragEvent<HTMLDivElement>) => {
      console.log(`Entered on element ${id}`);

      setTimeout(() => {
        setSelected(id);
      }, 0);

      const newElements = elements.map((elem) => {
        if (elem.id === id && !elem.isMounted) {
          elem.isVisible = true;
          elem.shape = editorSelection.shape;
        }
        return elem;
      });

      setElements(newElements);
    };

  const handleDragLeaveOuter = () => {
    setSelected(null);
  };

  const handleDragLeave =
    (id: Number) => (event: React.DragEvent<HTMLDivElement>) => {
      console.log(`Leave on element ${id}`);

      event.stopPropagation();

      setElements((prevElements) =>
        prevElements.map((elem) => {
          if (elem.id === id && !elem.isMounted) {
            elem.isVisible = false;
          }
          return elem;
        })
      );
    };

  const handleDragStart = (shape: Shape) => () => {
    console.log("drag start");

    setIsDragging(true);
    setEditorSelection((prev) => ({ ...prev, shape }));
  };
  const handleDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    console.log("drag end");

    setIsDragging(false);
  };

  return (
    <div>
      <DnDEditor
        editorSelection={editorSelection}
        handleDragStart={handleDragStart}
        handleDragEnd={handleDragEnd}
      />
      <DNDGraph
        elements={elements}
        handleDragEnter={handleDragEnter}
        handleDragLeave={handleDragLeave}
        handleDragLeaveOuter={handleDragLeaveOuter}
      />
    </div>
  );
}

export default DnDContainer;
