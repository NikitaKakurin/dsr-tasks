import { IInBasket } from 'model/typescript';

export const getAmount = (obj: IInBasket) => {
  return Object.values(obj).reduce((a, b) => a + b, 0);
};
