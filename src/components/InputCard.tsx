import React, { useState } from "react";

interface IProps {
  name: string;
  isRequired?: boolean;
  setIsValid?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function InputCard({ isRequired, setIsValid, name }: IProps) {
  const [value, setValue] = useState("");
  const [textError, setTextError] = useState("");
  const [typeCard, setTypeCard] = useState("");

  const americanExpress = /^3[47]/;
  const visa = /^4/;
  const masterCard =
    /^5[1-5]|^2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9][0-9]|7(?:[01][0-9]|20))/;
  const discover =
    /^65[4-9]|64[4-9]|6011|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5]))$/;
  const jsb = /^(?:2131|1800|35[0-9]{3})/;
  const dinners = /^3(?:0[0-5]|[68][0-9])/;

  function checkNumber(e: React.ChangeEvent<HTMLInputElement>) {
    const setValid = () => {
      setTextError("");
      if (setIsValid) setIsValid(true);
    };

    const setNotValid = () => {
      setTextError("number is not correct");
      if (setIsValid) setIsValid(false);
    };

    const splitByFour = (text: string) => {
      if (text.length > 16) return;
      const chunks = Math.floor(text.length / 4);
      let str = "";
      for (let i = 0; i < chunks; i++) {
        str += text.slice(4 * i, 4 * (i + 1)) + " ";
      }
      str += text.slice(4 * chunks);
      setValue(str.trim());
      if (text.length === 16) setValid();
      if (text.length < 16) setNotValid();
    };

    const splitBySix = (text: string, max: number) => {
      if (text.length <= max) {
        let str = "";
        if (text.length > 10) {
          str = `${text.slice(0, 4)} ${text.slice(4, 10)} ${text.slice(10)}`;
        } else if (text.length > 4) {
          str = `${text.slice(0, 4)} ${text.slice(4)}`;
        } else {
          str = text;
        }
        setValue(str.trim());
        if (text.length === max) setValid();
        if (text.length < max) setNotValid();
      }
    };

    let text = e.target.value.replaceAll(" ", "");
    if (!/\d/.test(text[text.length - 1]) && text[text.length - 1]) return;
    switch (true) {
      case visa.test(text):
        setTypeCard("Visa");
        splitByFour(text);
        break;
      case masterCard.test(text):
        setTypeCard("Master");
        splitByFour(text);
        break;
      case discover.test(text):
        setTypeCard("Discover");
        splitByFour(text);
        break;
      case jsb.test(text):
        setTypeCard("JSB");
        splitByFour(text);
        break;
      case americanExpress.test(text):
        setTypeCard("American Express");
        console.log("americanExpress");
        splitBySix(text, 15);
        break;
      case dinners.test(text):
        setTypeCard("Dinners");
        splitBySix(text, 14);
        break;
      default:
        setTypeCard("unknown");
        setValue(text);
        setNotValid();
        break;
    }
  }

  return (
    <div className="input__container">
      <label className="input__label">
        <span className="input__label_text">Please enter your card number</span>
        <input
          name={name}
          value={value}
          type="text"
          placeholder="card number"
          required={isRequired}
          onChange={checkNumber}
        />
        <p>
          <span>Card type is: {typeCard}</span>
        </p>
        <span className="errorText">{textError}</span>
      </label>
    </div>
  );
}
