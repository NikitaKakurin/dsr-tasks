import { useState } from "react";
import InputSelect from "./InputSelect";
import { useAppDispatch } from "../app/hooks";
import { nextForm } from "../app/actionsCreators/thumbActionsCreators";
import { setSubscribeData } from "../app/actionsCreators/registrationActionsCreators";

export const optionsSubscribe = [
  {
    value: "free",
    text: "Free option (but card must be attached on the next step anyway)",
  },
  {
    value: "Month",
    text: "Monthly subscription",
  },
  {
    value: "Year",
    text: "Yearly subscription",
  },
];

export default function FormSubscribe() {
  const [isValid, setIsValid] = useState(false);
  const dispatch = useAppDispatch();
  const goToNext = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid) return;
    const data = new FormData(e.target as HTMLFormElement);
    const subscribe = (data.get("subscribe") as string) || "";
    dispatch(setSubscribeData({ subscribe }));
    dispatch(nextForm());
  };

  return (
    <form className="form-subscribe" onSubmit={goToNext}>
      <h4>Subscription</h4>
      <InputSelect
        name="subscribe"
        isRequired={true}
        labelText="Choose a subscription"
        classes=""
        optionsData={optionsSubscribe}
        setIsValid={setIsValid}
      />
      <button className="button-next" disabled={!isValid}>
        Next
      </button>
    </form>
  );
}
