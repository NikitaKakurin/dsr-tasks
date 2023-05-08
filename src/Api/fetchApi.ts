import { useState } from "react";
import { IResponse, IWrongResponse, ICoin } from "../models/typescript";
export const fetchApi = async (cryptoName: string) => {
  try {
    const res = await fetch(
      `https://min-api.cryptocompare.com/data/price?fsym=${cryptoName}&tsyms=USD`,
      {
        headers: {
          authorization: `Apikey 98b7883f43198e55cbc0313b611bcfb37e539d27e76c6bae16854e939d64584b`,
        },
      }
    );
    if (res.ok) {
      const resData = (await res.json()) as IWrongResponse;
      if (resData.Response === undefined) {
        return resData as unknown as ICoin;
      }
      console.error(resData.Response);
    }
  } catch (error) {
    console.error(error);
  }
};
