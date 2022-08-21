const axios = require("axios");

const config = {
  method: 'get',
  url: 'https://pro-api.coinmarketcap.com/v1/partners/flipside-crypto/fcas/listings/latest',
  headers: { 
    'X-CMC_PRO_API_KEY': 'bca8b11f-e6f8-4f99-9466-66f8b4a5089e', 
    'Accept': '*/*'
  }
};

axios.request(config).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});

export default config



