const axios = require("axios");

const options = {
  method: 'GET',
  url: 'https://honeypotapi.p.rapidapi.com/api/v1/scan/',
  params: {
    factory_address: '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73',
    token_b: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    chain: 'bsc',
    exchange: 'Pancakeswap v2',
    token_a: '0xc9882def23bc42d53895b8361d0b1edc7570bc6a',
    router_address: '0x10ED43C718714eb63d5aA57B78B54704E256024E'
  },
  headers: {
    'X-RapidAPI-Key': '9580109447msh267f11370c482f9p19a78cjsn0adcee7286f8',
    'X-RapidAPI-Host': 'honeypotapi.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});

export default options




