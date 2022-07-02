import { useState } from "react";
import styled from "@emotion/styled";
import { v4 as uuidv4 } from "uuid";

import EditingItem, { EditingItemProps } from "./EditingItem";

const OuterWrapper = styled.div`
  width: 60%;
  background-color: yellow;
`;
const InnerWrapper = styled.div`
  background-color: green;
`;
interface EditingProps {}
function Editing({}: EditingProps) {
  const [editingItems, setEditingItems] = useState<EditingItemProps[]>([
    { id: uuidv4(), isEditable: true },
    { id: uuidv4(), isEditable: false },
    { id: uuidv4(), isEditable: true },
  ]);

  return (
    <OuterWrapper>
      <InnerWrapper>
        {editingItems.map(({ id, isEditable }, idx) => (
          <EditingItem key={id} id={id} isEditable={isEditable} />
        ))}
      </InnerWrapper>
    </OuterWrapper>
  );
}
export default Editing;
