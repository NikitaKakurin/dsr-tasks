import { nextForm } from "../app/actionsCreators/thumbActionsCreators";
import { useAppDispatch } from "../app/hooks";
import { setProfileData } from "../app/slices/registrationSlice";
import InputCheckbox from "./InputCheckbox";
import InputSelect from "./InputSelect";
import InputText from "./InputText";
import { useState, useEffect } from "react";

export const optionsGender = [
  {
    value: "male",
    text: "male",
  },
  {
    value: "female",
    text: "female",
  },
];

export default function FormProfile() {
  const [isValidFirstName, setIsValidFirstName] = useState(false);
  const [isValidSecondName, setIsValidSecondName] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidGender, setIsValidGender] = useState(false);
  const [is18, setIs18] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const dispatch = useAppDispatch();

  const goToNext = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid) return;
    const data = new FormData(e.target as HTMLFormElement);
    const firstName = (data.get("firstName") as string) || "";
    const secondName = (data.get("secondName") as string) || "";
    const middleName = (data.get("middleName") as string) || "";
    const old18 = (data.get("old18") as string) || "";
    const gender = (data.get("gender") as string) || "";
    const birthday = (data.get("birthday") as string) || "";
    const email = (data.get("email") as string) || "";

    dispatch(
      setProfileData({
        firstName,
        secondName,
        middleName,
        old18,
        gender,
        birthday,
        email,
      })
    );
    dispatch(nextForm());
  };

  useEffect(() => {
    setIsValid(
      [
        isValidFirstName,
        isValidSecondName,
        isValidEmail,
        isValidGender,
        is18,
      ].every((el) => el)
    );
  }, [isValidFirstName, isValidSecondName, isValidEmail, isValidGender, is18]);

  return (
    <form className="form" onSubmit={goToNext}>
      <h4>Profile data:</h4>
      <InputText
        name="firstName"
        isRequired={true}
        placeholder="First name"
        labelText="Please input your First name"
        errorText="required"
        classes="Form__input"
        setIsValid={setIsValidFirstName}
      />
      <InputText
        name="secondName"
        isRequired={true}
        placeholder="Second name"
        labelText="Please input your Second name"
        errorText="required"
        classes="Form__input"
        setIsValid={setIsValidSecondName}
      />
      <InputText
        name="middleName"
        isRequired={false}
        placeholder="Middle name"
        labelText="Please input your Middle name"
        classes="Form__input"
      />
      <InputText
        name="birthday"
        isRequired={false}
        placeholder="Birthday"
        labelText="Please input your Birthday"
        classes="Form__input"
        type="date"
      />
      <InputText
        name="email"
        type="email"
        isRequired={true}
        placeholder="Email"
        labelText="Please input your email"
        pattern="[a-z0-9]+@[a-z]+\.[a-z]{2,3}"
        errorText="email is not correct"
        classes="Form__input"
        setIsValid={setIsValidEmail}
      />
      <InputSelect
        name="gender"
        isRequired={true}
        labelText="Choose your gender:"
        classes="select"
        optionsData={optionsGender}
        setIsValid={setIsValidGender}
      />
      <InputCheckbox
        name="old18"
        setIsValid={setIs18}
        labelText="I am older 18 years"
        classes=""
      />
      <button className="button-next" disabled={!isValid}>
        Next
      </button>
    </form>
  );
}
