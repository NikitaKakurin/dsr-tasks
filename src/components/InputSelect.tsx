import React, { useState, useRef } from "react";

interface optionData {
  value: string;
  text: string;
}

interface IProps {
  optionsData: optionData[];
  name: string;
  labelText: string;
  isRequired?: boolean;
  errorText?: string;
  classes: string;
  setIsValid?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function InputSelect({
  labelText,
  errorText,
  classes,
  setIsValid,
  name,
  optionsData,
}: IProps) {
  const [value, setValue] = useState("");
  const selectError = useRef<HTMLInputElement>(null);
  const handlerSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const errorEl = selectError.current as HTMLInputElement;
    setValue(e.target.value);
    if (!e.target.value) {
      if (setIsValid) setIsValid(false);
      errorEl.innerHTML = errorText || "required";
      return;
    }
    if (setIsValid) setIsValid(true);
    errorEl.innerHTML = "";
  };
  return (
    <label className={classes}>
      <span>{labelText}</span>
      <select name={name} onChange={handlerSelect} value={value}>
        <option value="">--Please choose an option--</option>
        {optionsData.map((data) => (
          <option key={data.value} value={data.value}>
            {data.text}
          </option>
        ))}
      </select>
      <span className="errorText" ref={selectError}></span>
    </label>
  );
}
