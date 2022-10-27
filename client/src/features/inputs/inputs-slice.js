import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  email: "",
  password: "",
  todo: "",
};

const inputsSlice = createSlice({
  name: "inputs",
  initialState,
  reducers: {
    handleChange: (state, action) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
    resetInputs: (state) => {
      state.username = "";
      state.email = "";
      state.password = "";
      state.todo = "";
    },
  },
});

export const { handleChange, resetInputs } = inputsSlice.actions;

export default inputsSlice;
