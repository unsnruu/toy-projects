// todo : HOC 만들어야해
import React from "react";
import styled from "@emotion/styled";

import text from "./icons/text.png";
import img from "./icons/image.png";
import button from "./icons/button.png";

import { Options } from "./types";

const Icons = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid black;
  background-position: 50% 0;
  background-repeat: no-repeat;
  background-size: 100% auto;
`;
const TextIcon = styled(Icons)`
  background-image: url(${text});
`;
const ImageIcon = styled(Icons)`
  background-image: url(${img});
`;
const ButtonIcon = styled(Icons)`
  background-image: url(${button});
`;

interface EditorIconProps {
  option: Options;
  title: string;
  handleDragStart: () => void;
  handleDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
}
function EditorIcons({
  option,
  title,
  handleDragStart,
  handleDragEnd,
}: EditorIconProps) {
  switch (option) {
    case "button":
      return (
        <ButtonIcon
          draggable="true"
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          {title}
        </ButtonIcon>
      );
    case "image":
      return (
        <ImageIcon
          draggable="true"
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          {title}
        </ImageIcon>
      );
    case "text":
      return (
        <TextIcon
          draggable="true"
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          {title}
        </TextIcon>
      );
    case "divider":
      return <div></div>;
    default:
      return null;
  }
}

export default EditorIcons;
