import styled from "@emotion/styled";

const RectangleIcon = styled.div`
  width: 30px;
  height: 30px;
  background-color: black;
`;
const TriangleIcon = styled.div`
  width: 0;
  height: 0;
  border-bottom: calc(30px * 1.73) black;
  border-left: 30px transparent;
  border-right: 30px transparent;
`;
const CircleIcon = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

function EditorIcons() {
  return (
    <div>
      <RectangleIcon />
      <TriangleIcon />
      <CircleIcon />
    </div>
  );
}

export default EditorIcons;
