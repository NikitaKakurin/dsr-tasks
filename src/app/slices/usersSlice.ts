import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { TUser } from "models/dbTypes";
import { api, handleAxiosErrors } from "api/api";

const initialState = {
  users: [] as Array<TUser>,
  code: 200 as number | string,
  message: "",
  isError: false,
  isLoading: false,
  loadingText: "",
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
        return response.data;
      })
      .catch((_err) => {
        const data = handleAxiosErrors(_err);
        return rejectWithValue({ data });
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
        state.loadingText = "Getting Users data...";
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
