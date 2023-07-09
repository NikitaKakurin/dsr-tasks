import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ITodo } from "models/dbTypes";
import { AxiosError } from "axios";
import { api } from "api/api";
import { redirect } from "react-router-dom";

const initialState = {
  isLoading: false,
  isError: false,
  data: [] as Array<ITodo>,
  code: 200 as number | string,
  message: "",
};

const redirectToLogin = () => redirect("/login");

export type TTodosState = typeof initialState;

interface ITodoError {
  code: number | string;
  message: string;
}

interface ILoginErrorPayload {
  data: ITodoError;
}

export const getTodosAsync = createAsyncThunk(
  "todos/getTodosAsync",
  async (_, { rejectWithValue }) => {
    return await api
      .get<Array<ITodo>>(`todos`)
      .then((response) => response.data)
      .catch((_err) => {
        const error = _err as AxiosError;
        if (error.response) {
          return rejectWithValue({
            data: {
              code: error.response.status,
              message: error.message,
            },
          });
        } else if (!error.response && error.request) {
          return rejectWithValue({
            data: {
              code: error.code,
              message: error.message,
            },
          });
        }
        return rejectWithValue({ data: error.response });
      });
  }
);

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTodosAsync.pending, (state) => {
        console.log("getTodosAsync.pending: ", getTodosAsync.pending);
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getTodosAsync.fulfilled, (state, action) => {
        console.log("getTodosAsync.fulfilled: ", getTodosAsync.fulfilled);
        state.isLoading = false;
        state.isError = false;
        state.data = action.payload;
      })
      .addCase(getTodosAsync.rejected, (state, action) => {
        console.log("getTodosAsync.rejected: ", getTodosAsync.rejected);
        console.log("action: ", action);
        const payload = (action.payload as ILoginErrorPayload).data;
        state.isLoading = false;
        state.isError = true;
        state.code = payload.code;
        state.message = payload.message;
      });
  },
});

export const selectTodos = (state: RootState) => state.todosReducer;

export default todosSlice.reducer;
