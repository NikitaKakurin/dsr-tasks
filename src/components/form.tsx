import { useAppSelector } from "../app/hooks";
import FormAuth from "./FormAuth";
import FormCard from "./FormCard";
import FormConfirm from "./FormConfirm";
import FormProfile from "./FormProfile";
import FormResult from "./FormResult";
import FormSubscribe from "./FormSubscribe";

export const allForms = [
  <FormAuth />,
  <FormSubscribe />,
  <FormProfile />,
  <FormCard />,
  <FormConfirm />,
  <FormResult />,
];
export default function Form() {
  const { formNumber } = useAppSelector((state) => state.thumb);

  return <>{allForms[formNumber]}</>;
}
