const axios = require('axios');
import { useEffect } from "react";

// Function that runs the promises, and print the results
const index = async () => {
  const res = await Promise.all([promise1, promise2, promise3, promise4]);
  console.log(res);
};


// variables for apis
let api1 = `https://pro-api.coinmarketcap.com/v1/partners/flipside-crypto/fcas/listings/latest`;
let api2 = `https://coinmarketcap-cc.p.rapidapi.com/listings/latest/10`;
let api3 = `https://honeypotapi.p.rapidapi.com/api/v1/scan/`;
let api4 = `https://coingecko.p.rapidapi.com/coins/matic-network/market_chart/range`;

const optionsPromise1 = {
    method: 'get',
    url: api1,
    headers: { 
      'X-CMC_PRO_API_KEY': 'bca8b11f-e6f8-4f99-9466-66f8b4a5089e', 
      'Accept': '*/*'
    }
};

  const optionsPromise2 = {
    method: 'GET',
    url: api2,
    params: {api_key: 'bca8b11f-e6f8-4f99-9466-66f8b4a5089e'},
    headers: {
      'X-RapidAPI-Key': '9580109447msh267f11370c482f9p19a78cjsn0adcee7286f8',
      'X-RapidAPI-Host': 'coinmarketcap-cc.p.rapidapi.com'
  }
};

  const optionsPromise3 = {
    method: 'GET',
    url: api3,
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

const optionsPromise4 = {
  method: 'GET',
  url: api4,
  params: {from: '1659930501', vs_currency: 'usd', to: '1660621701'},
  headers: {
    'X-RapidAPI-Key': '9580109447msh267f11370c482f9p19a78cjsn0adcee7286f8',
    'X-RapidAPI-Host': 'coingecko.p.rapidapi.com'
  }
};

/*

  Task
  - Create a axios request that include the "optionsPromise" with respective number
  for example below :

  // example code
  const promise1 = new Promise((resolve,reject) => {
      axios.request(optionsPromise1).then(function (response) {
          console.log(response.data);
          resolve(response.data);
      }).catch(function (error) {
          console.error(error);
          reject('error in the request ...');
      });
  })


  Notes :
  - optionsPromise => are the structure for the request
  - axios => do the requests
  - reference of examples of axios => https://www.npmjs.com/package/axios

*/


// This resolve all the promises | you need to change this for the new promises created
Promise.all([promise1, promise2, promise3, promise4])
  .then((values) => {
    console.log(values);
  });

  response => {
    response.pipe(res);
    resolve()
  };
  error => {
    res.statusCode = 500;
    res.end(`Error getting the file: ${error}.`);
    reject()
}

export default index
