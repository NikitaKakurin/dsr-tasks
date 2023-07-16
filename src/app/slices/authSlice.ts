import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { TUser, IAuthReq } from "models/dbTypes";
import { AxiosError } from "axios";
import { api, handleAxiosErrors } from "api/api";
import { ROLE } from "constants/role";

const initialState = {
  name: "",
  role: "" as ROLE[keyof ROLE],
  code: 200 as number | string,
  message: "",
  isError: false,
  isLoading: false,
};

export type TAuthState = typeof initialState;

type TLoginError = Pick<TAuthState, "code" | "message">;

interface ILoginErrorPayload {
  data: TLoginError;
}

export const getMeAsync = createAsyncThunk(
  "auth/getMeAsync",
  async (_, { rejectWithValue }) => {
    return await api
      .get<TUser>(`me`)
      .then((response) => {
        return response.data;
      })
      .catch((_err) => {
        const data = handleAxiosErrors(_err);
        return rejectWithValue({ data });
      });
  }
);

export const logoutAsync = createAsyncThunk(
  "auth/logoutAsync",
  async (_, { rejectWithValue }) => {
    return await api
      .post<TUser>(`logout`)
      .then((response) => {
        return response.data;
      })
      .catch((_err) => {
        const data = handleAxiosErrors(_err);
        return rejectWithValue({ data });
      });
  }
);

export const loginAsync = createAsyncThunk(
  "auth/loginAsync",
  async ({ login, password }: IAuthReq, { rejectWithValue }) => {
    return await api
      .post<TUser>(`login`, { login, password })
      .then((response) => {
        return response.data;
      })
      .catch((_err) => {
        const data = handleAxiosErrors(_err);
        return rejectWithValue({ data });
      });
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.role = "";
      state.name = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // loginAsync
      .addCase(loginAsync.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        const payload = action.payload;
        state.role = payload.role;
        state.name = payload.name;
        state.code = 200;
        state.message = "";
        state.isError = false;
        state.isLoading = false;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        const payload = (action.payload as ILoginErrorPayload).data;
        state.role = "";
        state.name = "";
        state.code = payload.code;
        state.message = payload.message;
        state.isError = true;
        state.isLoading = false;
      })
      // logoutAsync
      .addCase(logoutAsync.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.role = "";
        state.name = "";
        state.code = 200;
        state.message = "";
        state.isError = false;
        state.isLoading = false;
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        const payload = (action.payload as ILoginErrorPayload).data;
        state.code = payload.code;
        state.message = payload.message;
        state.isError = true;
        state.isLoading = false;
      })
      // getMeAsync
      .addCase(getMeAsync.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(getMeAsync.fulfilled, (state, action) => {
        const payload = action.payload;
        state.role = payload.role;
        state.name = payload.name;
        state.code = 200;
        state.message = "";
        state.isError = false;
        state.isLoading = false;
      })
      .addCase(getMeAsync.rejected, (state, action) => {
        const payload = (action.payload as ILoginErrorPayload).data;
        state.code = payload.code;
        state.message = payload.message;
        state.isError = true;
        state.isLoading = false;
      });
  },
});

export const { logout } = authSlice.actions;

export const selectAuth = (state: RootState) => state.authReducer;

export default authSlice.reducer;
