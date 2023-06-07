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

export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: IRating;
}

export interface IRating {
  rate: number;
  count: number;
}
