import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";

const BarWrapperA = styled.div`
  overflow: scroll;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    width: 0;
  }
`;
const BarA = styled.div`
  width: 140vw;
  height: 2rem;
  scroll-behavior: smooth;
  background: linear-gradient(90deg, blue, black, purple, pink, green);
`;

const NavWrapper = styled.nav<{ moveX: number }>`
  overflow: hidden;
  height: 2rem;
  display: flex;
  align-items: center;
  background-color: skyblue;
`;
const NavItem = styled.div<{ moveX: number }>`
  height: 1rem;
  margin-right: 1rem;
  background-color: lightgray;
  user-select: none;
  cursor: pointer;
  transform: ${({ moveX }) => `translateX(${moveX}px)`};
`;
const InnerWrapper = styled.div<{ moveX: number }>`
  display: flex;
  transform: ${({ moveX }) => `translateX(${moveX}px)`};
`;
export default function Container() {
  const items =
    `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae sapiente odio accusantium consequatur, dolore eos quaerat! Odio suscipit optio ea adipisci commodi magnam, voluptates, minus possimus`.split(
      " "
    );

  const [isDown, setIsDown] = useState(false);
  const [anchorX, setAnchorX] = useState(0);
  const [moveX, setMoveX] = useState(0);
  const [width, setWidth] = useState(0);
  const element = useRef<any>();

  useEffect(() => {
    const current = element.current as HTMLElement;
    console.log(current.scrollWidth - current.offsetWidth);

    setWidth(current.scrollWidth - current.offsetWidth);
  }, []);

  return (
    <div>
      <div>
        <p>overflow scroll과 ::-webkit-scrollbar를 사용해서</p>
        <BarWrapperA>
          <BarA />
        </BarWrapperA>
      </div>
      <div>
        <p>javascirpt를 사용해서 1</p>
        <NavWrapper
          ref={element}
          moveX={moveX}
          onMouseDown={(e) => {
            setIsDown(true);
            setAnchorX(e.clientX);
          }}
          onMouseOver={(e) => {
            if (!isDown) return;
            const moved = (anchorX - e.clientX) / 10;
            setMoveX((prev) => {
              console.log("prev", prev);
              if (prev > 0) {
                return 0;
              } else if (-prev > width && moved > 0) {
                return prev;
              } else {
                return prev + -moved;
              }
            });
          }}
          onMouseLeave={(e) => {
            setIsDown(false);
          }}
          onMouseUp={(e) => {
            setIsDown(false);
          }}
        >
          {items.map((i, idx) => (
            <NavItem key={idx} moveX={moveX}>
              {i}
            </NavItem>
          ))}
        </NavWrapper>
      </div>
      <div>
        <p>javascirpt를 사용해서 2</p>
        <NavWrapper moveX={moveX}>
          <InnerWrapper
            moveX={moveX}
            onMouseDown={(e) => {
              setIsDown(true);
              setAnchorX(e.clientX);
            }}
            onMouseOver={(e) => {
              if (!isDown) return;
              const moved = anchorX - e.clientX;
              setMoveX((prev) => prev + -moved);
            }}
            onMouseLeave={(e) => {
              setIsDown(false);
            }}
            onMouseUp={(e) => {
              setIsDown(false);
            }}
          >
            {items.map((i, idx) => (
              <NavItem key={idx} moveX={moveX}>
                {i}
              </NavItem>
            ))}
          </InnerWrapper>
        </NavWrapper>
      </div>
    </div>
  );
}
