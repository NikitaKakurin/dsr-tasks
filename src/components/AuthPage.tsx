import { useAppDispatch, useAppSelector } from "app/hooks";
import { loginAsync, selectAuth } from "app/slices/authSlice";
import React from "react";

export default function AuthPage() {
  const dispatch = useAppDispatch();
  const {
    message: errorMessage,
    isError,
    isLoading,
  } = useAppSelector(selectAuth);

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
