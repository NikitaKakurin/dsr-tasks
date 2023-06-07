export interface ICard {
  img: string;
  price: string;
  prevPrice: string;
  rate: string;
  title: string;
  type: string;
  id: string;
}
export interface IInBasket {
  [id: string]: number;
}

export interface IInBasketContext {
  inBasket: IInBasket;
}
