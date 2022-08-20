// Some imports
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { GearFill } from 'react-bootstrap-icons';

// Components
import PageButton from '../../components/PageButton';
import ConnectButton from '../../components/ConnectButton';
import ConfigModal from '../../components/ConfigModal';
import CurrencyField from '../../components/CurrencyField';

// Design (?)
import BeatLoader from "react-spinners/BeatLoader";
import Button from 'react-bootstrap/Button';

// Needed for the swap (?)
import { getWethContract, getUniContract, getPrice, runSwap } from '../AlphaRouterService';

export default function Home() {  


  const [provider, setProvider] = useState(undefined)
  const [signer, setSigner] = useState(undefined)
  const [signerAddress, setSignerAddress] = useState(undefined)

  const [slippageAmount, setSlippageAmount] = useState(2)
  const [deadlineMinutes, setDeadlineMinutes] = useState(10)
  const [showModal, setShowModal] = useState(undefined)

  const [inputAmount, setInputAmount] = useState(undefined)
  const [outputAmount, setOutputAmount] = useState(undefined)
  const [transaction, setTransaction] = useState(undefined)
  const [loading, setLoading] = useState(undefined)
  const [ratio, setRatio] = useState(undefined)
  const [wethContract, setWethContract] = useState(undefined)
  const [uniContract, setUniContract] = useState(undefined)
  const [wethAmount, setWethAmount] = useState(undefined)
  const [uniAmount, setUniAmount] = useState(undefined)

  useEffect(() => {
    const onLoad = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider)
      
      const wethContract = getWethContract()
      setWethContract(wethContract)

      const uniContract = getUniContract()
      setUniContract(uniContract)
    }
    onLoad()
  }, [])

  const getSigner = async provider => {
    if(typeof provider.send == 'undefined') return;
    provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    getSigner(signer)
    //setSigner(signer) // <-- this line sets te signer
  }
  const isConnected = () => signer !== undefined
  const getWalletAddress = () => {
    signer.getAddress()
    .then(address => {
      setSignerAddress(address)

      // todo: connect weth and uni contracts
      wethContract.balanceOf(address)
          .then(res => {
            setWethAmount( Number(ethers.utils.formatEther(res)) )
          })
        uniContract.balanceOf(address)
          .then(res => {
            setUniAmount( Number(ethers.utils.formatEther(res)) )
          })
    })
  }

if (signer !== undefined) {
  getWalletAddress()
}


const getSwapPrice = (inputAmount) => {
  setLoading(true)
  setInputAmount(inputAmount)
  
  const swap = getPrice(
    inputAmount,
    slippageAmount,
    Math.floor(Date.now()/1000 + (deadlineMinutes * 60)),
    signerAddress
  ).then(data => {
    if(typeof data == 'undefined') return;
    setTransaction(data[0])
    setOutputAmount(data[1])
    setRatio(data[2])
    setLoading(false)
  })
}

return (
  <div className="App">
    <div className="appNav">
      <div className="my-2 buttonContainer buttonContainerTop">
{
}

      </div>

      
     <div className="rightNav">
      <div className="connectButtonContainer">
       
     </div>
  <div>
    </div>
   </div>
  </div>

    
    <div className="appBody">
        <div style={{position: 'absolute', top: 120, left: 470}} className="swapContainer">
        <div className="swapHeader">
          <span className="gearContainer" onClick={() => setShowModal(true)}>
          </span>
         
    </div>
     
       
    <div className="swapBody">
            <CurrencyField
              field="input"
              tokenName="Currency"
               />
              
              <span className="swapText">
              </span>
         <br></br>

          <div className="swapButtonContainer">
            {isConnected() ? (
              <div
                onClick={() => runSwap(transaction, signer)}
                className="swapButton"
              >
                connect
              </div>
            ) : (
              <div
                onClick={() => getSigner(provider)}
                className="swapButton"
              >
                Stake
              </div>              
            )}
          </div>
          </div>
          <img style={{position: 'absolute', top: -10, left: -370, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}} src={'/icem.png'} alt="backgroundleft" />
          <img style={{position: 'absolute', top: -10, left: -250, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}} src={'/icen.png'} alt="backgroundleft" />
          <img style={{position: 'absolute', top: 85, left: 40, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}} src={'/logo_icetoken.png'} alt="logo" />
              <span className="swapText2" style={{color: "#BB6BDA", position: 'absolute', top: 230, left: 10
              , right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}> Enter an amount to see more trading details &nbsp;</span>
              <br></br>
          <br></br>
          <br></br>
      
          &nbsp; 
          <span className="swapText2" style={{color: "white"}}>
            <strong>Public Airdrops:</strong>
          </span>
          <br></br>
          <br></br>
          
          
          <a href="http://localhost:3000/token">
            <span className="swapText2" style={{color: "white"}}>Purchase</span>
          </a>
          
          &nbsp; &nbsp; &nbsp; &nbsp; 
          
          <a href="https://twitter.com/">
            <span className="swapText2" style={{color: "white"}}>Twitter</span>
          </a>
          
          &nbsp; &nbsp; &nbsp; &nbsp; 
          
          <a href="https://discord.com/">
            <span className="swapText2" style={{color: "white"}}>Discord</span>
          </a>
          
          &nbsp; &nbsp; &nbsp; &nbsp; 
          
          <a href="https://www.pinksale.finance/">
            <span className="swapText2" style={{color: "white"}}>Pinksale</span>
          </a>
          
        
               <span className="swapText2" style={{color: "#BB6BDA", position: 'absolute', top: 47, left: 180
              , right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}> Period: &nbsp;</span>
              <span className="swapText2" style={{color: "#BB6BDA", position: 'absolute', top: 47, left: 318
              , right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}> 1 Month &nbsp;</span>
               <span className="swapText2" style={{color: "white", position: 'absolute', top: 87, left: -250
              , right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>ICE  ▽ &nbsp;</span>
              <span className="swapText2" style={{color: "white", position: 'absolute', top: 47, left: 390
              , right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}> ► &nbsp;</span>
              <span className="swapText2" style={{color: "white", position: 'absolute', top: 47, left: 250
              , right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}> ◄ &nbsp;</span>
              <br></br>



   </div>
  </div>
  </div>
  );


}
