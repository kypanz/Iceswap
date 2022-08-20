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
  /*
  <select style={{color: "white", backgroundColor: '#1F1933', outline:"none", border:"none"}}>
  <option>Token</option>
  <option>List new token</option>
  <option >Whitelisted tokens</option>
  <option >Earn</option>
  <option >Report</option>
  </select>
  <select style={{fontWeight: 'bold', color: "#BB6BDA", backgroundColor: '#1F1933', outline:"none", border:"none"}}>
  <option >Exchange</option>
  <option >Liquidity</option>
</select>

<select style={{color: "white", backgroundColor: '#1F1933', outline:"none", border:"none"}}>
  <option >Bridge</option>
  <option >Policies</option>
</select>

<select style={{color: "white", backgroundColor: '#1F1933', outline:"none", border:"none"}}>
<option >Withdraw</option>
<option >History</option>
</select>
*/
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
        <div style={{position: 'absolute', top: 120}}className="swapContainer4">
        <div className="swapHeader">
          <span className="gearContainer" onClick={() => setShowModal(true)}>
          </span>
          {showModal && (
              <ConfigModal
                onClose={() => setShowModal(false)}
                setDeadlineMinutes={setDeadlineMinutes}
                deadlineMinutes={deadlineMinutes}
                setSlippageAmount={setSlippageAmount}
                slippageAmount={slippageAmount} />
            )}
    </div>
    
    <div className="swapBody">
            <CurrencyField
              field="input"
              tokenName="Supply liquidity"
              getSwapPrice={getSwapPrice}
              signer={signer}
              balance={wethAmount} />
              <span className="swapText">
              </span>
            <CurrencyField color="#BB6BDA"
              field="output"
              tokenName="Receive"
              value={outputAmount}
              signer={signer}
              balance={uniAmount}
              spinner={BeatLoader}
              loading={loading } />
          </div>


          <div className="ratioContainer">
          <div className="ratioContainer">
            {ratio && (
              <>
                {`1 UNI = ${ratio} WETH`}
              </>
            )}
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <span className="swapText2" style={{color: "white"}}>1 MATIC = 0.99 ICE &nbsp;</span>
          </div>
          
          
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
                Add Liquidity
              </div>
              )}
              </div>
              </div>              
              <img style={{position: 'absolute', top: 20, left: 50, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}} src={'/iceSwap.png'} alt="logo" />
          <img style={{position: 'absolute', top: -10, left: -400, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}} src={'/icel.png'} alt="backgroundleft" />
          <img style={{position: 'absolute', top: 85, left: 35, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}} src={'/logo_icetoken.png'} alt="logo" />
          <img style={{position: 'absolute', top: 193, left: 35, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}} src={'/MATIC - Matic Token.png'} alt="logo" />
          <span class="link" onclick="window.location='https://icons8.com/' " target="_blank" className="swapText2" style={{color: "white",position: 'absolute', top: 200, left: -70}}>←</span>
              <span className="swapText2" style={{color: "white",position: 'absolute', top: 200, left: 495}}>→</span>
              <span className="swapText2" style={{color: "white", position: 'absolute', top: 340, left: 10, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>Enter an amount to see more trading details &nbsp;</span>
              <span className="swapText2" style={{color: "white", position: 'absolute', top: 370, left: -170, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>Pool share &nbsp;</span>
              <img style={{position: 'absolute', top: 370, left: 165, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}} src={'https://img.icons8.com/material-outlined/15/FFFFFF/help.png'} alt="logo" />
   </div>
  </div>
  </div>
  );


}
