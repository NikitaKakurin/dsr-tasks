import { useAppDispatch } from "app/hooks";
import { loginAsync } from "app/slices/authSlice";
import React from "react";
import ErrorBoundary from "./ErrorBoundary";
export default function AuthPage() {
  const dispatch = useAppDispatch();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    debugger;
    const data = new FormData(e.target as HTMLFormElement);
    const login = data.get("login") as string;
    const password = data.get("password") as string;
    dispatch(loginAsync({ login, password }));
  };
  return (
    <>
      <h2>AuthPage</h2>
      <ErrorBoundary fallback={<h1>ERROR</h1>}>
        <form className="form-auth" id="form-auth" onSubmit={handleSubmit}>
          <label htmlFor="form-auth__login">Please enter your login</label>
          <input type="text" name="login" id="form-auth__login" required />
          <label htmlFor="form-auth__password">
            Please enter your password
          </label>
          <input
            type="password"
            name="password"
            id="form-auth__password"
            required
          />
          <button type="submit">send</button>
        </form>
      </ErrorBoundary>
    </>
  );
}
