import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { TUser, IAuthReq, IAuthState, TResError } from "models/dbTypes";
import { fetchLogin } from "api/api";
import { AppDispatch } from "../store";
import axios, { AxiosError } from "axios";
import { error } from "console";
import internal from "stream";

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

// export const logout = () => {
//   return (dispatch: AppDispatch) => {
//     dispatch(authSlice.actions.logout());
//   };
// };

export const loginAsync = createAsyncThunk(
  "auth/loginAsync",
  async ({ login, password }: IAuthReq, { rejectWithValue }) => {
    return await axios
      .post<TUser>(
        `http://localhost:3000/api/v1/login`,
        { login, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => response.data)
      .catch((_err) => {
        const error = _err as AxiosError;
        if (error.response?.status === 500) {
          return rejectWithValue({
            data: { code: 500, message: "Internal Server Error" },
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
