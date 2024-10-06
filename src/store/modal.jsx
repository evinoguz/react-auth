import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  data: false,
};

const modal = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, actions) => {
      state.open = actions.payload.name;
      state.data = actions.payload.data || false;
    },
    closeModal: (state) => {
      state.open = false;
      state.data = false;
    },
  },
});
export const { openModal, closeModal } = modal.actions;
export default modal.reducer;
