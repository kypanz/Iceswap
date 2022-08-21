const axios = require("axios");

const options = {
  method: 'GET',
  url: 'https://coinmarketcap-cc.p.rapidapi.com/listings/latest/10',
  params: {api_key: 'bca8b11f-e6f8-4f99-9466-66f8b4a5089e'},
  headers: {
    'X-RapidAPI-Key': '9580109447msh267f11370c482f9p19a78cjsn0adcee7286f8',
    'X-RapidAPI-Host': 'coinmarketcap-cc.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});

export default options


