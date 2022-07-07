import React, { useState } from "react";
import styled from "@emotion/styled";

import { ControllerEventHandlers } from "./Container";

import prevRoute from "./icons/controller/prev.png";
import nextRoute from "./icons/controller/next.png";
import deleteRoute from "./icons/controller/delete.png";
import copyRoute from "./icons/controller/copy.png";

const Side = styled.div`
  position: absolute;
  z-index: 0;
  opacity: 0;
`;
const Wrapper = styled.div`
  position: relative;
  z-index: 99;
  &:hover div {
    opacity: 1;
  }
`;
const ControllerIcon = styled.div`
  cursor: pointer;
  & img {
    width: 1.5rem;
    height: 1.5rem;
    object-fit: contain;
  }
`;

interface ElementControllerProps extends React.PropsWithChildren {
  id: string;
  contorllerEventHandlers: ControllerEventHandlers;
}
function ElementController({
  children,
  id,
  contorllerEventHandlers,
}: ElementControllerProps) {
  return (
    <Wrapper>
      <Side style={{ left: 0 }}>
        <ControllerIcon
          onClick={contorllerEventHandlers.createClickPrevHandler(id)}
        >
          <img src={prevRoute} alt="prev" draggable="false" />
        </ControllerIcon>
        <ControllerIcon>
          <img
            src={nextRoute}
            alt="next"
            draggable="false"
            onClick={contorllerEventHandlers.createClickNextHandle(id)}
          />
        </ControllerIcon>
      </Side>
      <Side style={{ right: 0 }}>
        <ControllerIcon>
          <img src={copyRoute} alt="copy" draggable="false" />
        </ControllerIcon>
        <ControllerIcon>
          <img
            src={deleteRoute}
            alt="delete"
            draggable="false"
            onClick={contorllerEventHandlers.createClickDeleteHandle(id)}
          />
        </ControllerIcon>
      </Side>
      {children}
    </Wrapper>
  );
}

export default ElementController;
