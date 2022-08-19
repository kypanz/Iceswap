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
          {/*<ConnectButton
           provider={provider}
           isConnected={isConnected}
           signerAddress={signerAddress}
           getSigner={getSigner}
           />*/}
       </div>
    <div>
      </div>
     </div>
    </div>
    
      <div className="appBody">
        <div className="swapContainer">
        <div className="swapHeader">
        <span className="swapText"><img class="manImg" src=""></img>
        <img style={{position: 'absolute', top: 140, left: 600, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}} src={'/revolut_logo2.png'} alt="revolut" />
</span><br></br><br></br><br></br><br></br><br></br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
          <span className="swapText3">Supported currencies for wire transfer:</span>
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
    <br></br>
              <span className="swapText"><img class="manImg" src=""></img>
</span>
<img style={{position: 'absolute', top: 290, left: 550, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}} src={'/polygon.png'} alt="polygon" />   
<img style={{position: 'absolute', top: 290, left: 590, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}} src={'/logo_btc.png'} alt="btc" />
<img style={{position: 'absolute', top: 290, left: 630, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}} src={'/logo_aave.png'} alt="aave" />
<img style={{position: 'absolute', top: 290, left: 670, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}} src={'/logo_amp.png'} alt="amp" />
<img style={{position: 'absolute', top: 290, left: 710, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}} src={'/logo_xlm.png'} alt="xlm" />

<img style={{position: 'absolute', top: 330, left: 550, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}} src={'/logo_eth.png'} alt="eth" />
<img style={{position: 'absolute', top: 330, left: 590, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}} src={'/logo_1inch.png'} alt="1inch" />
<img style={{position: 'absolute', top: 330, left: 630, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}} src={'/logo_amp.png'} alt="amp" />
<img style={{position: 'absolute', top: 330, left: 670, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}} src={'/logo_doge.png'} alt="doge" />
<img style={{position: 'absolute', top: 330, left: 710, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}} src={'/logo_xpr.png'} alt="xpr" />

          </div>


          <div className="ratioContainer">
          <div className="ratioContainer">
            {ratio && (
              <>
                {`1 UNI = ${ratio} WETH`}
              </>
            )}
          </div>

          <div className="swapButtonContainer">
            {isConnected() ? (
              <div
                onClick={() => runSwap(transaction, signer)}
                className="swapButton4"
              >
                Swap
              </div>
            ) : (
              <div
              onClick={()=> window.open("https://app.revolut.com/start", "_blank")}   
              className="swapButton4"
              >
                Connect to Revolut
              </div>              
            )}
          </div>
          </div>
          <img style={{position: 'absolute', top: 20, left: 50, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}} src={'/iceSwap.png'} alt="logo" />
          <img style={{position: 'absolute', top: 110, left: 90, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}} src={'/iced.png'} alt="backgroundleft" />
          <img style={{position: 'absolute', top: 110, left: 1000, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}} src={'/icee.png'} alt="backgroundright" />
   </div>
  </div>
  </div>
  );


}
