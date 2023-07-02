import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { TUser, IAuthReq, IAuthState } from "models/dbTypes";
import { fetchLogin } from "api/api";
import { store } from "../store";

const initialState: IAuthState = {
  name: "",
  role: "",
  code: 200,
  errorMessage: "",
  isError: false,
};

interface ILoginError {
  code: number;
  message: string;
}

export const loginAsync = createAsyncThunk(
  "auth/loginAsync",
  async ({ login, password }: IAuthReq) => {
    const response = await fetchLogin({ login, password });
    if (response.status >= 200 && response.status < 300) {
      store.dispatch(authSlice.actions.loginSuccess(response.data as TUser));
      return;
    }
    store.dispatch(authSlice.actions.loginError(response.data as ILoginError));
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state: IAuthState, { payload }: PayloadAction<TUser>) => {
      debugger;
      state.role = payload.role;
      state.name = payload.name;
      state.code = 200;
      state.errorMessage = "";
      state.isError = false;
    },
    loginError: (
      state: IAuthState,
      { payload }: PayloadAction<ILoginError>
    ) => {
      debugger;
      state.role = "";
      state.name = "";
      state.code = payload.code;
      state.errorMessage = payload.message;
      state.isError = true;
    },
    logout: (state: IAuthState) => {
      state.role = "";
      state.name = "";
      state.code = 200;
      state.errorMessage = "";
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    // builder
    // .addCase(loginAsync.pending, (state, action) => {
    //   debugger;
    // })
  },
});

// export const { loginAsync } = authSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectAuth = (state: RootState) => state.authReducer;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default authSlice.reducer;
