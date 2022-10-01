import { createSlice } from "@reduxjs/toolkit";

interface TemplateMakerState {
  isDragging: boolean;
}
const initialState: TemplateMakerState = {
  isDragging: false,
};

export const templateMakerSlice = createSlice({
  name: "templateMaker",
  initialState,
  reducers: {
    dragStart: (state) => {},
  },
});
