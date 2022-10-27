import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/auth-slice";
import inputsSlice from "./inputs/inputs-slice";
import modalSlice from "./modals/modal-slice";
import todoSlice from "./todo/todo-slice";

const store = configureStore({
  reducer: {
    modal: modalSlice.reducer,
    inputs: inputsSlice.reducer,
    auth: authSlice.reducer,
    todos: todoSlice.reducer,
  },
});

export default store;
