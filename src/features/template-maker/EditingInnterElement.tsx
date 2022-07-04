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
      {isExpanded ? <div>Expanded</div> : null}
    </div>
  );
}

export default EditingInnerElement;
