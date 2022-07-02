import styled from "@emotion/styled";

const EditingItemWrapper = styled.div`
  display: flex;
  margin: 1rem;
  background-color: red;
`;
export interface EditingItemProps {
  id: string;
  isEditable: boolean;
}
function EditingItem({ isEditable }: EditingItemProps) {
  return (
    <EditingItemWrapper
      onDragEnter={() => {
        if (!isEditable) return;
        console.log("drag entered in Editable Wrapper");
      }}
    >
      {isEditable ? "Editable" : <EditingOption option="rectangle" />}
    </EditingItemWrapper>
  );
}

export default EditingItem;

interface EditingOptionProps {
  option: string;
}
const RectagleOption = styled.div`
  width: 100px;
  height: 100px;
  background-color: blue;
`;
const TriangleOption = styled.div`
  width: 0;
  height: 0;
  border-left: 100px transparent;
  border-right: 100px transparent;
  border-bottom: calc(100px * 1.73) blue;
`;
const CircleOption = styled.div`
  width: 0;
  height: 0;
  border-radius: 50%;
`;
function EditingOption({ option }: EditingOptionProps) {
  switch (option) {
    case "rectangle":
      return <RectagleOption />;
    case "trinagle":
      return <TriangleOption />;
    case "circle":
      return <CircleOption />;
    default:
      return <div />;
  }
}
