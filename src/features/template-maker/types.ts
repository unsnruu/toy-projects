export type EditableOption = "rectangle" | "triangle" | "circle" | "empty";

export interface MakerSelection {
  selectedOption: EditableOption;
  selectedItem: string | null;
}

export interface EditingItemType {
  id: string;
  renderTo: EditableOption;
}
