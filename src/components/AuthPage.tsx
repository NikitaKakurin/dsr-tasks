import { useAppDispatch, useAppSelector } from "app/hooks";
import { loginAsync } from "app/slices/authSlice";
import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "constants/routePaths";

export default function AuthPage() {
  const dispatch = useAppDispatch();
  const { role, errorMessage, isError, isLoading } = useAppSelector(
    (state) => state.authReducer
  );

  const navigate = useNavigate();
  useEffect(() => {
    if (role) navigate(ROUTE_PATHS.main);
  }, [navigate, role]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    const login = data.get("login") as string;
    const password = data.get("password") as string;
    dispatch(loginAsync({ login, password }));
  };
  return (
    <>
      {isLoading && <p>Loading...</p>}
      <h2>AuthPage</h2>
      <form className="form-auth" id="form-auth" onSubmit={handleSubmit}>
        {isError && <p className="error-message">{errorMessage}</p>}
        <label htmlFor="form-auth__login">Please enter your login</label>
        <input type="text" name="login" id="form-auth__login" required />
        <label htmlFor="form-auth__password">Please enter your password</label>
        <input
          type="password"
          name="password"
          id="form-auth__password"
          required
        />
        <button type="submit">send</button>
      </form>
    </>
  );
}
