import styled from "@emotion/styled";

const Wrapper = styled.div`
  width: 30%;
  background-color: red;
`;

function Editor() {
  return (
    <Wrapper>
      <div id="editor-item"></div>
    </Wrapper>
  );
}

export default Editor;
