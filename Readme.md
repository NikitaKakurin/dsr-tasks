#### branch cryptocompare - Create an app that allows you to follow cryptocurrency exchange rate, using CryptoCompare service. For getting exchange rates you can use this API: https://min-api.cryptocompare.com/data/price?fsym=<NAME>&tsyms=USD&api_key=<API_KEY&gt; where NAME is the name of cryptocurrency.

For getting API_KEY you need to sign up here https://www.cryptocompare.com/
Your app should have an input for searching cryptocurrencies and a list of cryptocurrencies you already follow.

1. Initially your app has Dogecoin cryptocurrency in the list.
2. You can write another cryptocurrency name in the input and click on button 'Search'
3. After clicking this button you send a request for API
4. It such cryptocurrency exists, then you add it to your list (but if it is already in the list then adding not needed)
5. Every five seconds this list updates and shows if they grow or fall. when exchange rate is changed, you need to show this somehow to user (for instance, green or red arrows)
6. Every currency has a button 'delete'
   P.S. You don't need to use Redux for this task
