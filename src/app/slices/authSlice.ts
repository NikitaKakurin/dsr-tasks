import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { TUser, IAuthReq, IAuthState } from "models/dbTypes";
import { AxiosError } from "axios";
import { api } from "api/api";

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

interface ILoginErrorPayload {
  data: ILoginError;
}

export const loginAsync = createAsyncThunk(
  "auth/loginAsync",
  async ({ login, password }: IAuthReq, { rejectWithValue }) => {
    return await api
      .post<TUser>(`login`, { login, password })
      .then((response) => response.data)
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
        const payload = action.payload;
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
