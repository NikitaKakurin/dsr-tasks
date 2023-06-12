import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { nextForm } from "../app/actionsCreators/thumbActionsCreators";
import InputCheckbox from "./InputCheckbox";
import { setConfirmData } from "../app/actionsCreators/registrationActionsCreators";

export default function FormConfirm() {
  const [isPersonalData, setIsPersonalData] = useState(false);
  const [isCookie, setIsCookie] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const dispatch = useAppDispatch();
  const { login, email } = useAppSelector((state) => state.auth);
  const goToNext = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid) return;
    const data = new FormData(e.target as HTMLFormElement);
    const confirmPersonal = (data.get("personalData") as string) || "";
    const confirmCookie = (data.get("cookie") as string) || "";
    dispatch(setConfirmData({ confirmCookie, confirmPersonal }));
    dispatch(nextForm());
  };
  useEffect(() => {
    setIsValid(isPersonalData && isCookie);
  }, [isPersonalData, isCookie]);

  return (
    <form className="form-auth" id="formAuth" onSubmit={goToNext}>
      <h4>Confirm</h4>
      <div className="input__container">
        <label className="input__label">
          <span className="input__label_text">Your Login:</span>
          <input type="text" className="" value={login} disabled />
        </label>
      </div>
      <div className="input__container">
        <label className="input__label">
          <span className="input__label_text">Your Email:</span>
          <input type="text" className="" value={email} disabled />
        </label>
      </div>
      <InputCheckbox
        name="personalData"
        setIsValid={setIsPersonalData}
        labelText="I consent to personal data processing"
        classes=""
      />
      <InputCheckbox
        name="cookie"
        setIsValid={setIsCookie}
        labelText="I agree cookie agreement"
        classes=""
      />
      <button className="button-next" disabled={!isValid}>
        Next
      </button>
    </form>
  );
}
