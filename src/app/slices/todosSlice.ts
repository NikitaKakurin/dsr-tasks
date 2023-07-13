import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState, store } from "../store";
import { ITodo } from "models/dbTypes";
import { AxiosError } from "axios";
import { api } from "api/api";
import { hideModal } from "./modalSlice";

const initialState = {
  isLoading: false,
  isError: false,
  data: [] as Array<ITodo>,
  code: 200 as number | string,
  message: "",
};

type IEditTodoAsyncProps = Pick<ITodo, "id" | "title" | "description">;

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

export const editTodoAsync = createAsyncThunk(
  "todos/editTodosAsync",
  async (
    { id, title, description }: IEditTodoAsyncProps,
    { rejectWithValue }
  ) => {
    return await api
      .put(`todos/${id}`, { title, description })
      .then((response) => {
        console.log("response: ", response);
        store.dispatch(hideModal());
        return { id, title, description };
      })
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

export const deleteTodoAsync = createAsyncThunk(
  "todos/deleteTodoAsync",
  async (id: number, { rejectWithValue }) => {
    return await api
      .delete(`todos/${id}`)
      .then((response) => {
        console.log("response: ", response);
        store.dispatch(hideModal());
        return { id };
      })
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
      // getTodosAsync
      .addCase(getTodosAsync.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getTodosAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.data = action.payload;
      })
      .addCase(getTodosAsync.rejected, (state, action) => {
        const payload = (action.payload as ILoginErrorPayload).data;
        state.isLoading = false;
        state.isError = true;
        state.code = payload.code;
        state.message = payload.message;
      })
      // editTodoAsync
      .addCase(editTodoAsync.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(editTodoAsync.fulfilled, (state, action) => {
        const { id, description, title } = action.payload;
        state.isLoading = false;
        state.isError = false;
        const todo = state.data.find((todo) => todo.id === id);
        if (todo) {
          todo.description = description;
          todo.title = title;
        }
      })
      .addCase(editTodoAsync.rejected, (state, action) => {
        const payload = (action.payload as ILoginErrorPayload).data;
        state.isLoading = false;
        state.isError = true;
        state.code = payload.code;
        state.message = payload.message;
      })
      // deleteTodoAsync
      .addCase(deleteTodoAsync.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(deleteTodoAsync.fulfilled, (state, action) => {
        const { id } = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.data = state.data.filter((todo) => todo.id !== id);
      })
      .addCase(deleteTodoAsync.rejected, (state, action) => {
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
