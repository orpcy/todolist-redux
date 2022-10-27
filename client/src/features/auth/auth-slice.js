import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { resetInputs } from "../inputs/inputs-slice";
import { closeModal } from "../modals/modal-slice";
import { fetchTodo } from "../todo/todo-slice";

let url = "";

let dbUrl = process.env.REACT_APP_API_URL;
if (dbUrl) url = dbUrl;

const initialState = {
  userId: "",
  username: "",
};

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    const resp = await axios.post(`${url}/user/login`, user);
    if (resp.data) {
      const { _id, username } = await resp.data;
      localStorage.setItem("userId", _id);
      localStorage.setItem("username", username);
      await thunkAPI.dispatch(fetchTodo(_id));
      await thunkAPI.dispatch(resetInputs());
      await thunkAPI.dispatch(closeModal("login"));
    }
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      const resp = await axios.post(`${url}/user`, user);
      if (resp.data) {
        const { _id, username } = await resp.data;
        localStorage.setItem("userId", _id);
        localStorage.setItem("username", username);
        await thunkAPI.dispatch(fetchTodo(_id));
        await thunkAPI.dispatch(resetInputs());
        await thunkAPI.dispatch(closeModal("register"));
      }
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    confirmAuthorization: (state) => {
      const getId = localStorage.getItem("userId");
      const getUsername = localStorage.getItem("username");
      if (getId) state.userId = getId;
      if (getId) state.username = getUsername;
    },
    logout: (state) => {
      state.userId = "";
      state.username = "";
      localStorage.clear();
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      const { _id, username } = action.payload;
      state.userId = _id;
      state.username = username;
      toast.success("Logged in successfully!");
    },
    [login.rejected]: (state, action) => {
      toast.error(action.payload);
    },
    [register.fulfilled]: (state, action) => {
      const { _id, username } = action.payload;
      state.userId = _id;
      state.username = username;
      toast.success("Registration successful!");
    },
    [register.rejected]: (state, action) => {
      toast.error(action.payload);
    },
  },
});

export const { confirmAuthorization, logout } = authSlice.actions;

export default authSlice;
