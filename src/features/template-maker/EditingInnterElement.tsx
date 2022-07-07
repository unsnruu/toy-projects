import styled from "@emotion/styled";

import { Options } from "./types";

interface EditingInnerElementProps {
  isExpanded: boolean;
  content: Options;
}
const InnerElementWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const CustomElementWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
  width: 100%;
  &:hover {
    border: 1px dashed black;
  }
  &:hover ::before {
  }
`;
function EditingInnerElement({
  isExpanded,
  content,
}: EditingInnerElementProps) {
  return (
    <InnerElementWrapper>
      <CustomElementWrapper>
        <CustomElement content={content} />
      </CustomElementWrapper>
      {isExpanded ? <ExpandedElement /> : null}
    </InnerElementWrapper>
  );
}

function CustomElement({ content }: { content: Options }) {
  switch (content) {
    case "button":
      return <ButtonElement />;
    case "image":
      return <ImageElement />;
    case "text":
      return <TextElement />;
    case "divider":
      return <Divider />;
    default:
      return <div></div>;
  }
}

export default EditingInnerElement;

const StyledElement = styled.div`
  display: flex;
  justify-content: center;
`;
const Expanded = styled(StyledElement)`
  padding: 1rem;
  border: 2px dashed skyblue;
  width: 100%;
`;
function ExpandedElement() {
  return <Expanded>여기에 컴포넌트가 추가 됩니다</Expanded>;
}

function TextElement() {
  return <input type="text" />;
}
function ImageElement() {
  return <input type="file" />;
}

const Button = styled.button`
  width: 100px;
  height: 40px;
  border: none;
  border-radius: 0.2rem;

  background-color: pink;
`;
function ButtonElement() {
  return <Button>버튼</Button>;
}

const Divider = styled.div`
  height: 2px;
  border: 1px solid blakc;
`;
function DividerElement() {
  return <Divider />;
}
