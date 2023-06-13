import React, { useState, useRef, useEffect } from "react";

interface IProps {
  name: string;
  value?: string;
  pattern?: string;
  errorText: string;
  classes: string;
  minLength?: number;
  maxLength?: number;
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function InputPassword({
  name,
  pattern,
  classes,
  errorText,
  minLength = 0,
  maxLength = Infinity,
  setIsValid,
}: IProps) {
  const [isPasswordConfirmValid, setPasswordConfirmValid] = useState(false);
  const [isPasswordValid, setPasswordValid] = useState(false);
  const inputPass = useRef<HTMLInputElement>(null);
  const inputRepeatPass = useRef<HTMLInputElement>(null);
  const inputPassError = useRef<HTMLSpanElement>(null);
  const inputRepeatPassError = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    console.log("useEffect");
    setIsValid(isPasswordConfirmValid && isPasswordValid);
  }, [isPasswordConfirmValid, isPasswordValid, setIsValid]);

  function checkPassword(e: React.ChangeEvent<HTMLInputElement>) {
    const inputPassword = inputPass.current as HTMLInputElement;
    const password = inputPassword.value;
    const errorEl = inputPassError.current as HTMLSpanElement;
    // check minimal length
    if (password.length < minLength) {
      errorEl.innerHTML = `must be longer than ${minLength}`;
      setPasswordValid(false);
      return;
    }
    // check maximal length
    if (password.length > maxLength) {
      errorEl.innerHTML = `must be shorter than ${maxLength}`;
      setPasswordValid(false);
      return;
    }
    // check pattern
    if (!pattern) return;
    const isValid = new RegExp(pattern).test(password);
    if (!isValid) {
      errorEl.innerHTML = errorText;
      setPasswordValid(false);
      return;
    }

    errorEl.innerHTML = "";
    setPasswordValid(true);
    checkConfirmPassword();
  }

  function checkConfirmPassword() {
    const inputConfirm = inputRepeatPass.current as HTMLInputElement;
    const pass = (inputPass.current as HTMLInputElement).value;
    const errorEl = inputRepeatPassError.current as HTMLSpanElement;
    // check match
    if (pass !== inputConfirm.value) {
      errorEl.innerHTML = "Password mismatch";
      setPasswordConfirmValid(false);
    } else {
      errorEl.innerHTML = "";
      setPasswordConfirmValid(true);
    }
  }

  return (
    <div className="input__container">
      <label className="input__label">
        <span className="input__label_text">Please enter your password</span>
        <input
          ref={inputPass}
          type="password"
          className={classes}
          placeholder="Password"
          required
          pattern={pattern}
          onChange={checkPassword}
          name={name}
        />
        <span className="errorText" ref={inputPassError}></span>
      </label>
      <label className="input__label">
        <span className="input__label_text">Please repeat password</span>
        <input
          ref={inputRepeatPass}
          type="password"
          className={classes}
          placeholder="Repeat password"
          required
          onChange={checkConfirmPassword}
        />
        <span className="errorText" ref={inputRepeatPassError}></span>
      </label>
    </div>
  );
}
