export const setValidity = (
  target: HTMLInputElement,
  isValid: boolean,
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>,
  errorText?: string
) => {
  target.setCustomValidity(errorText || "");
  setIsValid(isValid);
  target.reportValidity();
};
