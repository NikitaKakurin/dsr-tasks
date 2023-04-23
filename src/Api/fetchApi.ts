export const fetchCrypto = async (cryptoName: string) => {
  try {
    const res = await fetch(
      `https://min-api.cryptocompare.com/data/price?fsym=${cryptoName}&tsyms=USD`,
      {
        headers: {
          authorization: `Apikey 98b7883f43198e55cbc0313b611bcfb37e539d27e76c6bae16854e939d64584b`,
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
