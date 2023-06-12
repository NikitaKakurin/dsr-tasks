import React, { useState, useRef } from "react";

interface IProps {
  name: string;
  value?: string;
  placeholder: string;
  labelText: string;
  isRequired?: boolean;
  pattern?: string;
  errorText?: string;
  classes: string;
  minLength?: number;
  maxLength?: number;
  type?: string;
  setIsValid?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function InputText({
  name,
  placeholder,
  labelText,
  isRequired,
  pattern,
  classes,
  errorText = "",
  minLength = 0,
  maxLength = Infinity,
  type = "text",
  setIsValid,
}: IProps) {
  const [value, setValue] = useState("");
  const inputError = useRef<HTMLSpanElement>(null);
  function checkText(e: React.ChangeEvent<HTMLInputElement>) {
    const errorEl = inputError.current as HTMLInputElement;
    const text = e.target.value;
    setValue(text);
    if (isRequired) {
      if (text.length === 0) {
        errorEl.innerHTML = `required`;
        if (setIsValid) setIsValid(false);
        return;
      }
    }
    // check minLength
    if (text.length < minLength) {
      errorEl.innerHTML = `must be longer than ${minLength}`;
      if (setIsValid) setIsValid(false);
      return;
    }
    // check maxLength
    if (text.length > maxLength) {
      errorEl.innerHTML = `must be shorter than ${maxLength}`;
      if (setIsValid) setIsValid(false);
      return;
    }
    // check pattern
    if (pattern) {
      const isValid = new RegExp(pattern).test(text);
      if (!isValid) {
        errorEl.innerHTML = errorText;
        if (setIsValid) setIsValid(false);
        return;
      }
    }

    errorEl.innerHTML = "";
    if (setIsValid) setIsValid(true);
  }

  return (
    <div className="input__container">
      <label className="input__label">
        <span className="input__label_text">{labelText}</span>
        <input
          type={type}
          className={classes}
          value={value}
          placeholder={placeholder}
          required={isRequired}
          onChange={checkText}
          name={name}
        />
        <span className="errorText" ref={inputError}></span>
      </label>
    </div>
  );
}
