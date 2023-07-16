import { logout } from "app/slices/authSlice";
import { store } from "app/store";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "constants/baseUrl";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const handleAxiosErrors = (_err: unknown) => {
  const error = _err as AxiosError;
  debugger;
  if (error.response?.status && error.response.status === 401) {
    store.dispatch(logout());
    return {
      code: error.response.status,
      message: "You are not authorized. Please login",
    };
  }

  if (error.response?.status && error.response.status >= 500) {
    return {
      code: error.response.status,
      message: error.message,
    };
  }

  if (!error.response && error.request) {
    return {
      code: error.code,
      message: error.message,
    };
  }

  return error.response?.data;
};
