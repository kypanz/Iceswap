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
        <div style={{position: 'absolute', top: 120}} className="swapContainer2">
        <div className="swapHeader">
         
    <br></br>
    <span className="swapText2" style={{color: "white"}}><strong>List new token</strong></span>
              <br></br>
              <br></br>
              <span className="swapText2" style={{color: "white"}}>Project name: </span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
              <span className="swapText2" style={{color: "white"}}>Project name: </span>
              <br></br>
              <br></br>
              <div style={{ borderTop: "1px solid #BB6BDA", marginLeft: 0, marginRight: 20 }}></div>
              <span className="swapText2" style={{color: "white"}}>Type of listing: </span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              <span className="swapText2" style={{color: "white"}}>Project Link: </span>
              <br></br>
              <br></br>
              <div style={{ borderTop: "1px solid #BB6BDA", marginLeft: 0, marginRight: 20 }}></div>
              <span className="swapText2" style={{color: "white"}}>Project Github</span>
              <br></br>
              <br></br>
              <div style={{ borderTop: "1px solid #BB6BDA", marginLeft: 0, marginRight: 20 }}></div>
              <span className="swapText2" style={{color: "white"}}>Exchange trading information</span>
              <br></br>
              <br></br>
              <div style={{ borderTop: "1px solid #BB6BDA", marginLeft: 0, marginRight: 20 }}></div>
              <span className="swapText2" style={{color: "white"}}>Description </span>
              <br></br>
              <br></br>
              <div style={{ borderTop: "1px solid #BB6BDA", marginLeft: 0, marginRight: 20 }}></div>
              <span className="swapText2" style={{color: "white"}}>Upload Docs</span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              <span className="swapText2" style={{color: "#BB6BDA"}}>Whitepaper</span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
              <span className="swapText2" style={{color: "#BB6BDA"}}>Contract</span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
              <span className="swapText2" style={{color: "#BB6BDA"}}>Audits</span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              <span className="swapText2" style={{color: "#BB6BDA"}}>Token Information</span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  
              <br></br>
              <br></br>
             
    
    </div>
    

    <div className="ratioContainer">
          <div className="ratioContainer">
            {ratio && (
              <>
                {`1 UNI = ${ratio} WETH`}
              </>
            )}
          </div>

          <div style={{position: 'absolute', top: 400, left: 250, right: 220, bottom: 0}} className="swapButtonContainer">
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
          <img style={{position: 'absolute', top: 0, left: -250, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}} src={'/icek.png'} alt="backgroundleft" />
          <img style={{position: 'absolute', top: 365, left: 170, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}} src={'https://img.icons8.com/material-rounded/20/bb6bda/upload-to-cloud.png'} alt="backgroundleft" />
          <img style={{position: 'absolute', top: 365, left: 298, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}} src={'https://img.icons8.com/material-rounded/20/bb6bda/upload-to-cloud.png'} alt="backgroundleft" />
          <img style={{position: 'absolute', top: 365, left: 410, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}} src={'https://img.icons8.com/material-rounded/20/bb6bda/upload-to-cloud.png'} alt="backgroundleft" />
          <img style={{position: 'absolute', top: 365, left: 510, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}} src={'https://img.icons8.com/material-rounded/20/bb6bda/upload-to-cloud.png'} alt="backgroundleft" />
          <span className="swapText2" style={{color: "white",position: 'absolute', top: 370, left: 750}}>???</span>
          <span className="swapText2" style={{color: "white",position: 'absolute', top: 125, left: 750}}>???</span>
            
   </div>
  </div>
  </div>
  );


}
