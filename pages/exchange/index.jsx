import React, { useEffect, useState } from 'react'
import Moralis from 'moralis';
import IceSwapAccordion from '../../components/IceSwapAccordion';
import Button from 'react-bootstrap/Button';
import IceSwapModalSwap from '../../components/IceSwapModalSwap';
import {utils, BigNumber} from 'ethers';

export default function index() {

  // Variables for token support
  const [countTokenSupport, setCountTokensSupport] = useState(0);
  const [supportedTokens, setSupportedTokens] = useState([]); // recorrer todos los tokens

  // Variables for information Quote
  const [estimatedGas, setEstimateGas] = useState(0);
  const [fromToken, setFromToken] = useState(null);
  const [fromTokenAmount, setFromTokenAmount] = useState(0);
  const [toToken, setToToken] = useState(null);
  const [toTokenAmount, setToTokenAmount] = useState(0);
  const [chainUsed, setChainUsed] = useState('polygon');

  // Token A and Token B
  const [tokenA,setAToken] = useState('0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270');
  const [tokenB,setBToken] = useState('0x8f3cf7ad23cd3cadbd9735aff958023239c6a063');

  // For connection with moralis server
  Moralis.initialize(process.env.NEXT_PUBLIC_APP_ID);
  Moralis.serverURL = process.env.NEXT_PUBLIC_SERVER_URL;

  // Simple variable to re-render the component
  const [balanceToSwap, setBalanceToSwap] = useState('0.01');

  // default message when the metamask are not log in
  const DEFAULT_ERROR_MESSAGE = 'please connect your metamask wallet first';

  // Less decimals | note : this function works only if the value is a string
  const lessDecimals = (_amount) => {
    const balance = BigNumber.from(_amount);
    return Number(utils.formatEther(balance)).toFixed(6).toString()
  }

  // Init plugins
  const init = async () => {
    await Moralis.initPlugins();
  }

  // Functions plugins
  async function getSupportedTokens() {
    const tokens = await Moralis.Plugins.oneInch.getSupportedTokens({
      chain: chainUsed, // The blockchain you want to use (eth/bsc/polygon)
    });
    setCountTokensSupport(Object.keys(tokens.tokens).length);
    // <-- add token IceSwap before set the tokens items
    setSupportedTokens(Object.entries(tokens.tokens));
  }

  // Get information for the swap
  async function getQuote(isReRender) {
    try {

      /*
        Task :
        - Take the right token decimal to get the right values
      */

      const quote = await Moralis.Plugins.oneInch.quote({
        chain: chainUsed,
        fromTokenAddress: tokenA,
        toTokenAddress: tokenB,
        amount: Number(Moralis.Units.ETH(balanceToSwap))
      });
      setEstimateGas(quote.estimatedGas);
      setFromToken(quote.fromToken);
      setFromTokenAmount(quote.fromTokenAmount);
      setToToken(quote.toToken);
      setToTokenAmount(quote.toTokenAmount);
      console.log('all actions done.')
    } catch (error) {
      if(isReRender == true) return;
      alert('you are in the right network ?, please select polygon network in metamask ...');
    }
  }

  // Render information about the swap
  const tokenInformation = (info,tokenType) => {
    if(info == null) return;
    return(
      <div style={{textAlign:'left',marginTop:'25px'}} key={tokenType}>
        <img src={info.logoURI} width="50" height="50" style={{border:'3px solid #19b9b1',borderRadius:'50%'}} key={tokenType} />
        {/* Token name */}
        <p style={{marginTop:'15px',fontStyle:'italic'}}> {info.name} </p>
        {(tokenType == 'A') ? <p>Amount to swap  :  </p> : null }
        {(tokenType == 'A') ? <input type="number" defaultValue={'0.01'} onChange={(e)=>setBalanceToSwap(e.target.value)} /> : null }
        <br/>
        {(tokenType == 'B') ? <p> You get : <span style={{fontSize:'1.3em',color:'chartreuse'}}>{lessDecimals(toTokenAmount)}</span> </p> : null }
        <IceSwapModalSwap changeTokenSelected={changeTokenSelected} supportedTokens={supportedTokens} tokenType={tokenType} />
        <IceSwapAccordion info={ { address : info.address, symbol : info.symbol, decimals : info.decimals } } />
      </div>
    )
  }

  // Approve amount of tokens
  async function approve() {
    if(typeof window.ethereum.selectedAddress == 'undefined') return alert(DEFAULT_ERROR_MESSAGE);
    await Moralis.enableWeb3();
    await Moralis.Plugins.oneInch.approve({
      chain: chainUsed, // The blockchain you want to use (eth/bsc/polygon)
      tokenAddress: tokenA, // The token you want to swap
      fromAddress: window.ethereum.selectedAddress, // Your wallet address
      amount : Number(Moralis.Units.ETH('0.02'))
    });
  }

  // Swap the tokens with respective balance approved before
  async function swap() {
    if(typeof window.ethereum.selectedAddress == 'undefined') return alert(DEFAULT_ERROR_MESSAGE);
    try {
      const receipt = await Moralis.Plugins.oneInch.swap({
        chain: chainUsed,
        fromTokenAddress: tokenA,
        toTokenAddress: tokenB,
        amount: Number(Moralis.Units.ETH('0.02')),
        fromAddress: window.ethereum.selectedAddress,
        slippage: 1,
      });
    } catch (error) {
      alert('You really have the suficent amount of tokens to swap ?, please check'); // <-- this function is gonna be automatic check in the future
    }
  }

  // Input functions
  const changeTokenSelected = (_tokenSelected,tokenAorB) => {
    const _valueSelected = _tokenSelected.toLowerCase();
    let _selectedToken = '';
    supportedTokens.map((cont,index)=>{
      let _nameToken = (cont[1].name).toLowerCase();
      if(_nameToken == _valueSelected) _selectedToken = cont[0];
    });
    if(_selectedToken == '') return alert('please select a correct token');
    if(tokenAorB == 'A') {
      setAToken(_selectedToken);
    }
    if(tokenAorB == 'B') {
      setBToken(_selectedToken);
    }

  }

  // Render
  useEffect(()=>{
    window.onload = async function () {
      await init();
      await getSupportedTokens();
      await getQuote();
    }
    if(tokenA){
      getQuote(true)
    } // <-- Rerender when tokenA or TokenB changes
  },[tokenA,tokenB,balanceToSwap]);

  return (
    <div className="App">
        <a href="https://moralis.io/plugins/1inch/" className="reference-link" target="_blank">  IceSwap use Moralis, click here to see </a>
        <h3 style={{paddingTop:'35px'}}>Polygon Exchange</h3>
        <p style={{marginTop:'15px'}}> Quantity of supported tokens <span style={{color:'coral',marginLeft:'15px',fontSize:'1.3em'}}> {countTokenSupport} </span> </p>

        <section id="box_swap">

          {/*<p> estimate gas {estimatedGas} </p>
          <p> fromTokenAmount : {fromTokenAmount} </p>
          <p> toTokenAmount : {toTokenAmount} </p>*/}
          
          {/* Default text when the data is loading */}
          {(fromToken == null || typeof fromToken == 'undefined') ? <p style={{marginTop:'15px',fontSize:'1.3em'}}> Loading data ... </p> : null}

          {/* Information about tokens to Swap */}
          {tokenInformation(fromToken,'A')}
          {tokenInformation(toToken,'B')}

          {/* Approve button */}
          {(fromToken == null || typeof fromToken == 'undefined') ? null : <p style={{marginTop:'15px', color:'coral'}}> You need approve before swap </p> }
          {(fromToken == null || typeof fromToken == 'undefined') ? null :  <Button variant="primary" onClick={approve} style={{marginTop:'15px',marginRight:'15px'}} > Approve </Button> }

          {/* Swap button */}
          {(fromToken == null || typeof fromToken == 'undefined') ? null :  <Button variant="primary" onClick={swap} style={{marginTop:'15px'}} > Swap </Button> }
          

        </section>
        

    </div>
  )
}
