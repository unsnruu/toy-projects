interface EditingInnerElementProps {
  isExpanded: boolean;
}

function EditingInnerElement({ isExpanded }: EditingInnerElementProps) {
  return (
    <div>
      <div>Fixed</div>
      {isExpanded ? <div>Expanded</div> : null}
    </div>
  );
}

export default EditingInnerElement;
