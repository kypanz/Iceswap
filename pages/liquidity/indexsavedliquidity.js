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
        <div className="swapContainer4">
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
   

         
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <br></br>
            <span className="swapText2" style={{color: "white"}}><strong>Your saved liquidity pools&nbsp;</strong></span>


              <div className="ratioContainer">
              </div>
              </div>              
          <img style={{position: 'absolute', top: 20, left: 50, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}} src={'/iceSwap.png'} alt="logo" />
          <img style={{position: 'absolute', top: 110, left: 90, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}} src={'/icel.png'} alt="backgroundleft" />
          <img style={{position: 'absolute', top: 250, left: 710, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}} src={'liquiditypool.png'} alt="logo" />
          <span className="swapText2" style={{color: "white",position: 'absolute', top: 300, left: 450}}>←</span>
              <span className="swapText2" style={{color: "white",position: 'absolute', top: 300, left: 1100}}>→</span>
              <span className="swapText2" style={{color: "white", position: 'absolute', top: 400, left: 270, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>It seems like you do not have any liquidity
pool yet. &nbsp;</span>
              <span className="swapText2" style={{color: "white", position: 'absolute', top: 450, left: 270
              , right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}> Do you already have one? &nbsp;</span>
              <span className="swapText2" style={{color: "#BB6BDA", position: 'absolute', top: 500, left: 270
              , right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}> Import &nbsp;</span>
              <img style={{position: 'absolute', top: 500, left: 730, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}} src={'https://img.icons8.com/material-outlined/20/bb6bda/upload-to-cloud.png'} alt="logo" />
   </div>
  </div>
  </div>
  );


}
