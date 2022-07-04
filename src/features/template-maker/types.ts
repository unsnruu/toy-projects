export type EditableOption = "rectangle" | "triangle" | "circle" | "empty";

export interface EditingItemType {
  id: string;
  renderTo: EditableOption;
}
