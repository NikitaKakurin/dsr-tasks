import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { TUser, IAuthReq, IAuthState, TResError } from "models/dbTypes";
import { fetchLogin } from "api/api";
import { store } from "../store";
import axios, { AxiosError } from "axios";
import { error } from "console";

const initialState: IAuthState = {
  name: "",
  role: "",
  code: 200,
  errorMessage: "",
  isError: false,
  isLoading: false,
};

interface ILoginError {
  code: number;
  message: string;
}

interface ILoginSuccessPayload {
  data: TUser;
}
interface ILoginErrorPayload {
  data: ILoginError;
}

export const loginAsync = createAsyncThunk(
  "auth/loginAsync",
  async ({ login, password }: IAuthReq, { rejectWithValue }) => {
    return await axios
      .post<TUser>(
        `http://localhost:3000/api/v1/login`,
        { login: login, password: password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .catch((_err) => {
        const error = _err as AxiosError;
        return rejectWithValue({ data: error.response?.data });
      });
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state: IAuthState) => {
      state.role = "";
      state.name = "";
      state.code = 200;
      state.errorMessage = "";
      state.isError = false;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        const payload = action.payload.data as TUser;
        state.role = payload.role;
        state.name = payload.name;
        state.code = 200;
        state.errorMessage = "";
        state.isError = false;
        state.isLoading = false;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        const payload = (action.payload as ILoginErrorPayload).data;
        state.role = "";
        state.name = "";
        state.code = payload.code;
        state.errorMessage = payload.message;
        state.isError = true;
        state.isLoading = false;
      });
  },
});

export const { logout } = authSlice.actions;

export const selectAuth = (state: RootState) => state.authReducer;

export default authSlice.reducer;
