import styled from "@emotion/styled/";

const Rect = styled.div`
  width: 20px;
  height: 20px;
  background-color: black;
`;
const EditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem;
  border: 1px solid black;
  padding: 1rem;
`;

function Editor() {
  return (
    <EditorWrapper>
      <Rect
        draggable={true}
        onDragStart={(e) => {
          console.log("drag start");
        }}
        onDragEnd={() => {
          console.log("drag end");
        }}
      />
    </EditorWrapper>
  );
}

export default Editor;
