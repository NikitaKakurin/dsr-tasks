import React, { useRef } from "react";

interface IProps {
  name: string;
  labelText: string;
  isRequired?: boolean;
  errorText?: string;
  classes: string;
  setIsValid?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function InputCheckbox({
  name,
  labelText,
  setIsValid,
  errorText,
}: IProps) {
  const checkbox = useRef<HTMLInputElement>(null);
  const checkboxError = useRef<HTMLInputElement>(null);

  const handleChange = () => {
    const checkboxEl = checkbox.current as HTMLInputElement;
    const errorEl = checkbox.current as HTMLSpanElement;
    if (!checkboxEl.checked) {
      errorEl.innerHTML = errorText || "";
      if (setIsValid) setIsValid(false);
      return;
    }
    errorEl.innerHTML = "";
    if (setIsValid) setIsValid(true);
  };
  return (
    <div>
      <input
        type="checkbox"
        id={name}
        name={name}
        required
        ref={checkbox}
        onChange={handleChange}
      />
      <label htmlFor={name}>{labelText}</label>
      <span className="errorText" ref={checkboxError}></span>
    </div>
  );
}
