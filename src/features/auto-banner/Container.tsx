import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

import useInterval from "./useInterval";

const BackgroundPaper = styled.div`
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Box = styled.div`
  width: 50%;
  height: 2rem;
  align-items: center;
  border-radius: 10px;
  box-shadow: 1px 1px 1rem lightgray;
  overflow: hidden;
`;
const Text = styled.div<{ idx: number; isTransition: boolean }>`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: ${({ idx }) => `translateY(${-100 * idx}%)`};
  transition: ${({ isTransition }) =>
    isTransition ? `all 0.3s linear` : null};
`;

const initTexts = [
  "새로운 신농업 산업, 먹거리 혁신이 될까",
  "국제 유가 상승, 극적인 협상 타결?",
  "공매도 거래 제한 요구, 개미들이 운다",
  "오늘도 폭염주의보... 지구온난화의 실태",
  "새로운 신농업 산업, 먹거리 혁신이 될까",
];
const initDelay = 2000;

function Container() {
  const [idx, setIdx] = useState(0);
  const [delay, setDelay] = useState<number | null>(initDelay);
  const [isTransition, setIsTransition] = useState(true);
  const texts = initTexts;

  const handleClickStop = () => {
    setDelay(null);
  };
  const handleClickStart = () => {
    setDelay(initDelay);
  };

  useEffect(() => {
    if (idx === 0) {
      setDelay(0);
      setIsTransition(false);
    } else if (idx === 1) {
      setDelay(initDelay);
      setIsTransition(true);
    }
  }, [idx]);

  useInterval(() => {
    setIdx((prev) => {
      if (prev === texts.length - 1) {
        return 0;
      } else {
        return prev + 1;
      }
    });
  }, delay);

  return (
    <BackgroundPaper>
      <Box>
        {texts.map((text, index) => (
          <Text key={index} idx={idx} isTransition={isTransition}>
            <a
              onMouseEnter={handleClickStop}
              onMouseLeave={handleClickStart}
              href="/"
              style={{
                userSelect: "none",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              {text}
            </a>
          </Text>
        ))}
      </Box>
    </BackgroundPaper>
  );
}

export default Container;
