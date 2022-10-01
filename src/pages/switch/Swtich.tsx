import { useState } from "react";
import styled from "@emotion/styled";

import CatSrc from "../../assets/images/cat-space.gif";
import DogSrc from "../../assets/images/dog-space.gif";

const Container = styled.div<{ toggle: boolean }>`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: ${({ toggle }) =>
    toggle ? `url(${CatSrc})` : `url(${DogSrc})`};
  background-size: 200px 200px;
`;
const SwitchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 6rem;
  height: 2rem;
  background-color: white;
  border-radius: 1rem;
  /* overflow: hidden; */
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2) inset;

  /* padding: 1rem; */
`;

const SwitchButton = styled.div<{ toggle: boolean }>`
  width: 2rem;
  height: 2rem;
  position: absolute;
  box-shadow: 1px 1px 5px black;
  border-radius: 1rem;
  cursor: pointer;
  background-color: white;
  transform: ${({ toggle }) =>
    toggle ? `translateX(0%)` : `translateX(200%)`};
  transition: all 0.3s;
`;
const SwitchContentLeft = styled.span<{ toggle: boolean }>`
  text-align: center;
  position: absolute;
  left: 1rem;
  display: ${({ toggle }) => (toggle ? "none" : "inline")};
  user-select: none;
`;
const SwitchContentRight = styled.span<{ toggle: boolean }>`
  text-align: center;
  user-select: none;
  display: ${({ toggle }) => (toggle ? "inline" : "none")};
  right: 1rem;
  position: absolute;
`;

function Switch() {
  const [toggle, setToggle] = useState(false);

  return (
    <Container toggle={toggle}>
      <SwitchContainer
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        <SwitchContentLeft toggle={toggle}>강아지</SwitchContentLeft>
        <SwitchContentRight toggle={toggle}>고양이</SwitchContentRight>
        <SwitchButton toggle={toggle} />
      </SwitchContainer>
    </Container>
  );
}

export default Switch;
