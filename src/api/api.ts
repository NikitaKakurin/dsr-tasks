import axios from "axios";
import { BASE_URL } from "constants/baseUrl";
import { IAuthReq, TUser, TResError } from "../models/dbTypes";

export const api = axios.create({
  baseURL: BASE_URL,
});

export const fetchLogin = async ({ login, password }: IAuthReq) => {
  return await axios
    .post<TUser | TResError>(
      `http://localhost:3000/api/v1/login`,
      { login: login, password: password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .catch((error) => {
      return error.response;
    });
};