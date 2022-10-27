import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { resetInputs } from "../inputs/inputs-slice";

let url = "";

let dbUrl = process.env.REACT_APP_API_URL;
if (dbUrl) url = dbUrl;

const initialState = {
  items: [],
};

export const fetchTodo = createAsyncThunk(
  "auth/todo/get",
  async (_id, thunkAPI) => {
    try {
      const resp = await axios(`${url}/todo/${_id}`);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addToDo = createAsyncThunk(
  "auth/todo/post",
  async (todoItem, thunkAPI) => {
    try {
      const resp = await axios.post(`${url}/todo`, todoItem);
      if (resp.data) await thunkAPI.dispatch(resetInputs());
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "auth/todo/delete",
  async (_id, thunkAPI) => {
    try {
      const resp = await axios.delete(`${url}/todo/${_id}`);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const markAsComplete = createAsyncThunk(
  "auth/todo/update",
  async (_id, thunkAPI) => {
    try {
      const resp = await axios.put(`${url}/todo/${_id}`);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const todoSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetTodos: (state) => {
      state.items = [];
    },
  },
  extraReducers: {
    [fetchTodo.fulfilled]: (state, action) => {
      state.items = action.payload;
    },
    [addToDo.fulfilled]: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    [deleteTodo.fulfilled]: (state, action) => {
      state.items = state.items.filter((t) => t._id !== action.payload._id);
    },
    [markAsComplete.fulfilled]: (state, action) => {
      state.items = state.items.map((s) => {
        if (s._id === action.payload._id) {
          s.completed = !s.completed;
        }
        return s;
      });
    },
  },
});

export const { resetTodos } = todoSlice.actions;

export default todoSlice;
