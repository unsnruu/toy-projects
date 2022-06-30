import { useState, useEffect } from "react";

import DnDEditor from "./DnDEditor";
import DNDGraph from "./DnDGraph";

export interface Element {
  id: number;
  isVisible: boolean;
  isMounted: boolean;
}
const initElements: Element[] = Array.from({ length: 9 }, (v, idx) => ({
  id: idx,
  isMounted: false,
  isVisible: false,
}));
initElements[0].isMounted = true;
initElements[0].isVisible = true;

interface EditorData {
  shape: string;
  color: string;
}
function DNDContainer() {
  const [editor, setEditor] = useState({});
  const [elements, setElements] = useState<Element[]>(initElements);

  const [isDragging, setIsDragging] = useState(false);
  const [selected, setSelected] = useState<null | Number>(null);
  console.log(selected);

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

  const handleDragStart = () => {
    console.log("drag start");
    setIsDragging(true);
  };
  const handleDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    console.log("drag end");

    setIsDragging(false);
  };

  return (
    <div>
      <DnDEditor
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

export default DNDContainer;
