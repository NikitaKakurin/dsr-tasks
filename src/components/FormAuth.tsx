import InputText from "./InputText";
import InputPassword from "./InputPassword";
import { useState, useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import { setAuthData } from "../app/slices/registrationSlice";
import { nextForm } from "../app/actionsCreators/thumbActionsCreators";

export default function FormAuth() {
  const [isValidLogin, setIsValidLogin] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const dispatch = useAppDispatch();
  const goToNext = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid) return;
    const data = new FormData(e.target as HTMLFormElement);
    const login = (data.get("login") as string) || "";
    const password = (data.get("password") as string) || "";
    dispatch(setAuthData({ login, password }));
    dispatch(nextForm())
  };
  useEffect(() => {
    setIsValid(isValidLogin && isValidPassword);
  }, [isValidLogin, isValidPassword]);

  return (
    <form className="form-auth" id="formAuth" onSubmit={goToNext}>
      <h4>Registration</h4>
      <InputText
        name="login"
        isRequired={true}
        placeholder="Login"
        labelText="Please input your login"
        pattern="^[a-z]+$"
        errorText="Login must be entered in lowercase"
        classes="Form__input"
        setIsValid={setIsValidLogin}
      />
      <InputPassword
        name="password"
        pattern="(?=.*\d)(?=.*[a-zA-Z]).*"
        errorText="password must contain at least one letter and one number"
        classes="Form__input"
        minLength={6}
        setIsValid={setIsValidPassword}
      />
      <button className="button-next" disabled={!isValid}>
        Next
      </button>
    </form>
  );
}
