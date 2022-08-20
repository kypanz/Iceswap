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
        <div style={{position: 'absolute', top: 120, left: -150, right: 0, bottom: 0}} className="swapContainer2">
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
              <span className="swapText4"><strong>Policies</strong></span>
              <br></br>&nbsp; &nbsp; 
          
              <br></br>&nbsp; &nbsp; 
              <span className="swapText2" style={{color: "white"}}>Tellus pellentesque eu tincidunt tortor aliquam. Ultrices eros in cursus turpis massa tincidunt dui ut. Aliquam id diam &nbsp; &nbsp; &nbsp; maecenas ultricies mi. Nisi quis eleifend quam adipiscing.  &nbsp;</span>
              <br></br><br></br>&nbsp; &nbsp; 
              <span className="swapText2" style={{color: "white"}}><strong>Nibh ipsum consequat nisl vel pretium lectus quam id leo.  &nbsp;</strong></span>
              <br></br>&nbsp; &nbsp; 
              <span className="swapText2" style={{color: "white"}}> Aenean et tortor at risus viverra adipiscing at in tellus. Nisl condimentum id venenatis a condimentum vitae sapien. &nbsp;</span>
              <br></br><br></br>&nbsp; &nbsp; 
              <span className="swapText2" style={{color: "white"}}><strong>Vulputate ut pharetra sit amet aliquam id diam maecenas ultricies.  &nbsp;</strong></span>
              <br></br>&nbsp; &nbsp; 
              <span className="swapText2" style={{color: "white"}}>Tellus pellentesque eu tincidunt tortor aliquam. Ultrices eros in cursus turpis massa tincidunt dui ut. Aliquam id diam &nbsp; &nbsp; &nbsp; maecenas ultricies mi. Nisi quis eleifend quam adipiscing.  &nbsp;</span>
              <br></br><br></br>&nbsp; &nbsp; 
              <span className="swapText2" style={{color: "white"}}><strong>Nibh ipsum consequat nisl vel pretium lectus quam id leo.  &nbsp;</strong></span>
              <br></br>&nbsp; &nbsp; 
              <span className="swapText2" style={{color: "white"}}> Aenean et tortor at risus viverra adipiscing at in tellus. Nisl condimentum id venenatis a condimentum vitae sapien. &nbsp;</span>
              
           
         
          </div>
   </div>
  </div>
  </div>
  );


}
