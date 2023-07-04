import { ROLE } from "constants/role";

export interface IAuthReq {
  login: string;
  password: string;
}

export interface IAuthState {
  name: string;
  role: ROLE[keyof ROLE];
  code: number;
  errorMessage: string;
  isError: boolean;
}

export interface ITodo {
  id: number;
  title: string;
  description: string;
  createdBy: string;
}

export type TResError = Pick<IAuthState, "code" | "errorMessage">;

export type TUser = Pick<IAuthState, "name" | "role">;

export type TTodoCreate = Pick<ITodo, "title" | "description">;
