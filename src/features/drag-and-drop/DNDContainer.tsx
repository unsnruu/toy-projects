import { useState, useEffect } from "react";

import DnDEditor from "./DnDEditor";
import DNDGraph from "./DnDCanvas";

export type Shape = "rectangle" | "triangle" | "circle";
export interface EditorSelection {
  shape: Shape;
  color: string;
}

export interface Element {
  id: number;
  shape: Shape;
  color: string;
  isHovering: boolean;
  isMounted: boolean;
}

const initElements: Element[] = Array.from({ length: 9 }, (_, idx) => ({
  id: idx,
  shape: "rectangle",
  color: "#000000",
  isMounted: false,
  isHovering: false,
}));
/**
 * isVisible의 정확한 역할이 무엇일까?
 * 만약 Editor에서 선택한 item이
 * Canvas의 Element위에 hovering되었을 때
 * 그 element의 색상을 구분짓기 위한 용도로 사용
 */

function DnDContainer() {
  const [editorSelection, setEditorSelection] = useState<EditorSelection>({
    shape: "rectangle",
    color: "#000000",
  });

  const [elements, setElements] = useState<Element[]>(initElements);
  const [isDragging, setIsDragging] = useState(false);
  const [selected, setSelected] = useState<null | number>(null);

  useEffect(() => {
    if (Number.isNaN(selected) || isDragging) return;

    setElements((prevElements) =>
      prevElements.map((elem) => {
        if (elem.id === selected) {
          elem.isMounted = true;
        }
        return elem;
      })
    );
  }, [selected, isDragging]);

  const changeEditorColor = (color: string) => {
    setEditorSelection((prev) => ({ ...prev, color }));
  };

  //Event Handler
  const handleDragEnter =
    (id: number) => (event: React.DragEvent<HTMLDivElement>) => {
      setTimeout(() => {
        setSelected(id);
      }, 0);

      const newElements = elements.map((elem) => {
        if (elem.id === id && !elem.isMounted) {
          elem.isHovering = true;
          elem.shape = editorSelection.shape;
          elem.color = editorSelection.color;
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
      event.stopPropagation();

      setElements((prevElements) =>
        prevElements.map((elem) => {
          if (elem.id === id && !elem.isMounted) {
            elem.isHovering = false;
          }
          return elem;
        })
      );
    };

  const handleDragStart = (shape: Shape, color: string) => () => {
    setIsDragging(true);
    setEditorSelection({ color, shape });
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
        changeEditorColor={changeEditorColor}
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
