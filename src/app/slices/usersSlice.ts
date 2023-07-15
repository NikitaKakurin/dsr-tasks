import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { TUser } from "models/dbTypes";
import { AxiosError } from "axios";
import { api } from "api/api";

const initialState = {
  users: [] as Array<TUser>,
  code: 200 as number | string,
  message: "",
  isError: false,
  isLoading: false,
};

export type TUsersState = typeof initialState;

type TUsersError = Pick<TUsersState, "code" | "message">;

interface ILoginErrorPayload {
  data: TUsersError;
}

export const getUsersAsync = createAsyncThunk(
  "users/getUsersAsync",
  async (_, { rejectWithValue }) => {
    return await api
      .get<Array<TUser>>(`users`)
      .then((response) => {
        console.log("response: ", response);
        console.log("response.data: ", response.data);

        return response.data;
      })
      .catch((_err) => {
        const error = _err as AxiosError;
        if (error.response?.status && error.response.status >= 500) {
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
        return rejectWithValue({ data: error.response?.data });
      });
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getUsersAsync
      .addCase(getUsersAsync.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(getUsersAsync.fulfilled, (state, action) => {
        const payload = action.payload;
        state.code = 200;
        state.message = "";
        state.users = payload;
        state.isError = false;
        state.isLoading = false;
      })
      .addCase(getUsersAsync.rejected, (state, action) => {
        const payload = (action.payload as ILoginErrorPayload).data;
        state.code = payload.code;
        state.message = payload.message;
        state.isError = true;
        state.isLoading = false;
      });
  },
});

export const selectUsers = (state: RootState) => state.usersReducer;

export default usersSlice.reducer;
