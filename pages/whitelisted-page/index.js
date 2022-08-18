// Some imports
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { GearFill } from 'react-bootstrap-icons';

// Components
import ConfigModal from '../../components/ConfigModal';

// Needed for the swap (?)
import { getWethContract, getUniContract, getPrice, runSwap } from '../AlphaRouterService';

export default function index() {  

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
    setTransaction(data[0])
    setOutputAmount(data[1])
    setRatio(data[2])
    setLoading(false)
  })
}


return (
    <div className="App">
      <div className="appNav">
       <div className="rightNav">
       {/*<div className="connectButtonContainer">
          <ConnectButton
           provider={provider}
           isConnected={isConnected}
           signerAddress={signerAddress}
           getSigner={getSigner}
           />
          </div>*/}
      </div>
    </div>
    
    <div className="appBody">
        
      <div className="swapContainer2">
        
        <div className="swapHeader">
          
          <span className="swapText2">Current network<select style={{color: "white", backgroundColor: '#1F1933', outline:"none", border:"none"}}>
            <option >Polygon</option>
            <option >Ethereum</option>
            <option >Polkadot</option>
            <option >Solana</option>
          </select>
          </span>
          
          &nbsp; &nbsp; &nbsp;
          
          <span className="swapText2">Curreny
          <select style={{color: "white", backgroundColor: '#1F1933', outline:"none", border:"none"}}>
            <option >MATIC</option>
            <option >ETH</option>
            <option >DOT</option>
            <option >SOL</option>
          </select>

          </span>
          
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
          
          <span className="gearContainer" onClick={() => setShowModal(true)}>
          <GearFill color="#BB6BDA"/>
          </span>

          {showModal && (
            <ConfigModal
              onClose={() => setShowModal(false)}
              setDeadlineMinutes={setDeadlineMinutes}
              deadlineMinutes={deadlineMinutes}
              setSlippageAmount={setSlippageAmount}
              slippageAmount={slippageAmount} />
          )}

          <span className="swapText2" style={{color: "#53F3C3"}}>
            <strong>Score:  99/100</strong>
          </span>
          
          <br></br>
          <progress style={{margin: "1px 470px"}} id="file" max="100" value="99"> 99% </progress>
          <br></br>
          <br></br>
          <span className="tokenName"><strong>Security Check</strong></span>
          <br></br>
          <span className="swapText2" style={{color: "white"}}>This project has beed audited &nbsp;  <img align="center" class="manImg" src="https://img.icons8.com/ios-filled/20/228BE6/up-right-arrow.png" alt="link"></img><img align="right" class="manImg" src="https://img.icons8.com/glyph-neue/20/53f3c3/checkmark.png" alt="mark"></img></span>
          <br></br>
          <span className="swapText2" style={{color: "white"}}>This project has not been reported as a scam, rug pull or honey pot &nbsp;  <img align="center" class="manImg" src="https://img.icons8.com/ios-filled/20/228BE6/up-right-arrow.png" alt="link"></img><img align="right" class="manImg" src="https://img.icons8.com/glyph-neue/20/53f3c3/checkmark.png" alt="mark"></img></span>
          <br></br>
          <span className="swapText2" style={{color: "white"}}>This project has a healthy transaction volume &nbsp;  <img align="center" class="manImg" src="https://img.icons8.com/ios-filled/20/228BE6/up-right-arrow.png" alt="link"></img><img align="right" class="manImg" src="https://img.icons8.com/glyph-neue/20/53f3c3/checkmark.png" alt="mark"></img></span>
          <br></br>
          <span className="swapText2" style={{color: "white"}}>This project has contains a healthy liquidity ratio &nbsp;  <img align="center" class="manImg" src="https://img.icons8.com/ios-filled/20/228BE6/up-right-arrow.png" alt="link"></img><img align="right" class="manImg" src="https://img.icons8.com/glyph-neue/20/53f3c3/checkmark.png" alt="mark"></img></span>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          
          <span className="swapText2" style={{color: "white"}}>
            <strong>Original links:</strong>
          </span>
          
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          
          <a href="https://www.google.com/">
            <span className="swapText2" style={{color: "white"}}>Website</span>
          </a>
          
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          
          <a href="https://www.google.com/">
            <span className="swapText2" style={{color: "white"}}>Block explorer</span>
          </a>
          
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          
          <a href="https://www.google.com/">
            <span className="swapText2" style={{color: "white"}}>Twitter</span>
          </a>
          
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          
          <a href="https://www.google.com/">
            <span className="swapText2" style={{color: "white"}}>Discord</span>
          </a>

         
        </div>
        
        <img style={{position: 'absolute', top: 20, left: 50, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}} src={'/iceSwap.png'} alt="logo" />
        <img style={{position: 'absolute', top: 110, left: 90, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}} src={'/icec.png'} alt="backgroundleft" />
   
      </div>

    </div>

  </div>
  );


}
