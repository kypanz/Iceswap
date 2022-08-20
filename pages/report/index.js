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
       
    <div>
      </div>
     </div>
    </div>
    
    <div className="appBody">
        <div style={{position: 'absolute', top: 120}} className="swapContainer2">
        <div className="swapHeader">
          <span className="tokenName"><strong>Report</strong>
          </span>
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
           
           <br></br>
              <span className="swapText2" style={{color: "white"}}>Token: </span>
              <br></br>
              <br></br>
              <div style={{ borderTop: "1px solid #BB6BDA", marginLeft: 0, marginRight: 20 }}></div>
              <span className="swapText2" style={{color: "white"}}>Smart contract address: </span>
              <br></br>
              <br></br>
              <div style={{ borderTop: "1px solid #BB6BDA", marginLeft: 0, marginRight: 20 }}></div>
              <span className="swapText2" style={{color: "white"}}>Project Link </span>
              <br></br>
              <br></br>
              <div style={{ borderTop: "1px solid #BB6BDA", marginLeft: 0, marginRight: 20 }}></div>
              <span className="swapText2" style={{color: "white"}}>Issue</span>
              <br></br>
              <br></br>
              <div style={{ borderTop: "1px solid #BB6BDA", marginLeft: 0, marginRight: 20 }}></div>
              <span className="swapText2" style={{color: "white"}}>Upload proof </span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span className="swapText2" style={{color: "#BB6BDA"}}>Transference.pdf</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <br></br>
              <progress style={{margin: "10px 130px", color: "#BB6BDA"}} id="file" max="100" value="25"> 99% </progress>

          </div>

          <div className="ratioContainer">
          <div className="ratioContainer">
            {ratio && (
              <>
                {`1 UNI = ${ratio} WETH`}
              </>
            )}
          </div>

          <div style={{position: 'absolute', top: 560, left: 700, right: 0, bottom: 0}} className="swapButtonContainer">
            {isConnected() ? (
              <div
                onClick={() => runSwap(transaction, signer)}
                className="swapButton"
              >
                Send
              </div>
            ) : (
              <div
                onClick={() => getSigner(provider)}
                className="swapButton"
              >
                Send
              </div>              
            )}
          </div>
  
         
          </div>
          <img style={{position: 'absolute', top: -10, left: -310, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}} src={'/iceo.png'} alt="backgroundleft" />
   </div>
  </div>
  </div>
  );


}
