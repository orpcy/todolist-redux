import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showLogin: false,
  showRegister: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      if (action.payload === "login") state.showLogin = true;
      if (action.payload === "register") state.showRegister = true;
    },
    closeModal: (state, action) => {
      if (action.payload === "login") state.showLogin = false;
      if (action.payload === "register") state.showRegister = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice;
