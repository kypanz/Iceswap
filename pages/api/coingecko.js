const axios = require("axios");

const options = {
  method: 'GET',
  url: 'https://coingecko.p.rapidapi.com/coins/matic-network/market_chart/range',
  params: {from: '1659930501', vs_currency: 'usd', to: '1660621701'},
  headers: {
    'X-RapidAPI-Key': '9580109447msh267f11370c482f9p19a78cjsn0adcee7286f8',
    'X-RapidAPI-Host': 'coingecko.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});

export default options




