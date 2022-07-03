export type EditableOption = "rectangle" | "triangle" | "circle" | "empty";

export interface MakerSelection {
  selectedIcon: EditableOption;
  selectedItem: string | null;
}

export interface EditingItemType {
  id: string;
  renderTo: EditableOption;
}
