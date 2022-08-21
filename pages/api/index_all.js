const axios = require('axios');
import { useEffect } from "react";

const index = async () => {
  const res = await Promise.all([promise1, promise2, promise3, promise4]);
  console.log(res);
};

  let api1 = `https://pro-api.coinmarketcap.com/v1/partners/flipside-crypto/fcas/listings/latest`;
  let api2 = `https://coinmarketcap-cc.p.rapidapi.com/listings/latest/10`;
  let api3 = `https://honeypotapi.p.rapidapi.com/api/v1/scan/`;
  let api4 = `https://coingecko.p.rapidapi.com/coins/matic-network/market_chart/range`;

  const promise1 = {
    method: 'get',
  url: 'https://pro-api.coinmarketcap.com/v1/partners/flipside-crypto/fcas/listings/latest',
  headers: { 
    'X-CMC_PRO_API_KEY': 'bca8b11f-e6f8-4f99-9466-66f8b4a5089e', 
    'Accept': '*/*'
  }
};

  const promise2 = {
    method: 'GET',
  url: 'https://coinmarketcap-cc.p.rapidapi.com/listings/latest/10',
  params: {api_key: 'bca8b11f-e6f8-4f99-9466-66f8b4a5089e'},
  headers: {
    'X-RapidAPI-Key': '9580109447msh267f11370c482f9p19a78cjsn0adcee7286f8',
    'X-RapidAPI-Host': 'coinmarketcap-cc.p.rapidapi.com'
  }
};

  const promise3 = {
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

const promise4 = {
  method: 'GET',
  url: 'https://coingecko.p.rapidapi.com/coins/matic-network/market_chart/range',
  params: {from: '1659930501', vs_currency: 'usd', to: '1660621701'},
  headers: {
    'X-RapidAPI-Key': '9580109447msh267f11370c482f9p19a78cjsn0adcee7286f8',
    'X-RapidAPI-Host': 'coingecko.p.rapidapi.com'
  }
};

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

