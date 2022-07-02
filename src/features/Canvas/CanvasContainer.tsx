import Editor from "./Editor";
import Editing from "./Editing";
import styled from "@emotion/styled";

const Wrapper = styled.div`
  display: flex;
`;
function CanvasContainer() {
  return (
    <Wrapper>
      <Editing />
      <Editor />
    </Wrapper>
  );
}
export default CanvasContainer;
