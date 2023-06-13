import { useAppSelector } from "../app/hooks";
import { optionsGender } from "./FormProfile";
import { optionsSubscribe } from "./FormSubscribe";

export default function FormResult() {
  const {
    login,
    email,
    password,
    subscribe,
    birthday,
    firstName,
    secondName,
    middleName,
    old18,
    cardData,
    confirmCookie,
    confirmPersonal,
    gender,
  } = useAppSelector((state) => state.auth);

  return (
    <div className="form" id="formAuth">
      <h4>Result:</h4>
      <div className="input__container">
        <label className="input__label">
          <span className="input__label_text">Your login:</span>
          <input type="text" className="" value={login} disabled />
        </label>
      </div>
      <div className="input__container">
        <label className="input__label">
          <span className="input__label_text">Your password:</span>
          <input type="text" className="" value={password} disabled />
        </label>
      </div>
      <label className="select">
        <span>Your subscribe plan</span>
        <select value={subscribe}>
          <option value="">--Please choose an option--</option>
          {optionsSubscribe.map((data) => (
            <option key={data.value} value={data.value}>
              {data.text}
            </option>
          ))}
        </select>
      </label>
      <div className="input__container">
        <label className="input__label">
          <span className="input__label_text">First name:</span>
          <input type="text" className="" value={firstName} disabled />
        </label>
      </div>
      <div className="input__container">
        <label className="input__label">
          <span className="input__label_text">Second name:</span>
          <input type="text" className="" value={secondName} disabled />
        </label>
      </div>
      <div className="input__container">
        <label className="input__label">
          <span className="input__label_text">Middle name:</span>
          <input type="text" className="" value={middleName} disabled />
        </label>
      </div>
      <div className="input__container">
        <label className="input__label">
          <span className="input__label_text">birthday:</span>
          <input type="date" className="" value={birthday} disabled />
        </label>
      </div>
      <div className="input__container">
        <label className="input__label">
          <span className="input__label_text">Your email:</span>
          <input type="text" className="" value={email} disabled />
        </label>
      </div>
      <label className="select">
        <span>Your gender:</span>
        <select value={gender}>
          <option value="">--Please choose your gender--</option>
          {optionsGender.map((data) => (
            <option key={data.value} value={data.value}>
              {data.text}
            </option>
          ))}
        </select>
      </label>
      <div>
        <input
          id="old18Result"
          type="checkbox"
          checked={old18 ? true : false}
        />
        <label htmlFor="old18Result">I am older than 18 years</label>
      </div>
      <div className="input__container">
        <label className="input__label">
          <span className="input__label_text">Card number:</span>
          <input type="text" className="" value={cardData} disabled />
        </label>
      </div>
      <div>
        <input
          id="consentPresonal"
          type="checkbox"
          checked={confirmPersonal ? true : false}
        />
        <label htmlFor="consentPresonal">
          I consent to personal data processing
        </label>
      </div>
      <div>
        <input
          id="consentCookie"
          type="checkbox"
          checked={confirmCookie ? true : false}
        />
        <label htmlFor="consentCookie">I agree cookie agreement</label>
      </div>
    </div>
  );
}
