import styled from "@emotion/styled";

interface EditingInnerElementProps {
  isExpanded: boolean;
  content: string;
}

function EditingInnerElement({
  isExpanded,
  content,
}: EditingInnerElementProps) {
  return (
    <div>
      <div>{content}</div>
      {isExpanded ? <ExpandedElement /> : null}
    </div>
  );
}

export default EditingInnerElement;

function ExpandedElement() {
  return <div>여기에 컴포넌트가 추가됩니다</div>;
}

function TextElement() {
  return <input type="text" />;
}
function ImageElement() {
  return <input type="file" />;
}
function ButtonElement() {
  return <input type="button" />;
}

const Divider = styled.div`
  height: 2px;
  border: 1px solid blakc;
`;
function DividerElement() {
  return <Divider />;
}
