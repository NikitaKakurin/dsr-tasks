import React, { useState } from "react";
import InputCard from "./InputCard";
import { useAppDispatch } from "../app/hooks";
import { nextForm } from "../app/actionsCreators/thumbActionsCreators";
import { setCardData } from "../app/actionsCreators/registrationActionsCreators";

export default function FormCard() {
  const [isValid, setIsValid] = useState(false);
  const dispatch = useAppDispatch();
  const goToNext = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid) return;
    const data = new FormData(e.target as HTMLFormElement);
    const cardData = (data.get("cardNumber") as string) || "";
    dispatch(setCardData({ cardData }));
    dispatch(nextForm());
  };
  return (
    <form className="form" onSubmit={goToNext}>
      <h4>Card number:</h4>
      <InputCard isRequired={true} setIsValid={setIsValid} name="cardNumber" />
      <button className="button-next" disabled={!isValid}>
        Next
      </button>
    </form>
  );
}
