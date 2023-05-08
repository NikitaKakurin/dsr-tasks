export interface ICoin {
  USD: number;
}

export interface ICoinData {
  [key: string]: ICoin;
}

export interface IWrongResponse {
  Response: string;
  Message: string;
  HasWarning: boolean;
  Type: number;
  RateLimit: RateLimit;
  Data: Data;
  Cooldown: number;
}
export interface RateLimit {}
export interface Data {}
