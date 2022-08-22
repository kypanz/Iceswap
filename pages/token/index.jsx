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



/*

  Images used

// icecream right 
<img style={{position: 'absolute', top: 110, left: 1000, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}} src={'/icej.png'} alt="backgroundright" />
 
//QR code image example => redirect to app.iceswap.app website
 <img style={{position: 'absolute', top: 420, left: 450, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}} src={'/qrcode.png'} alt="backgroundright" />
 
//Simple icon button to "Share"
<img style={{position: 'absolute', top: 500, left: 765, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}} src={'https://img.icons8.com/fluency-systems-filled/20/8b8ca7/share-rounded.png'} alt="share" />

//Simple icon button to "Copy"
<img style={{position: 'absolute', top: 500, left: 805, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}} src={'https://img.icons8.com/external-becris-lineal-becris/20/8b8ca7/external-copy-mintab-for-ios-becris-lineal-becris.png'} alt="copy" />

*/

return (
  <div className="App">
    
      {/* icecream left */}

      <div style={{display:'flex',justifyContent:'center'}}>

        <img style={{ width:'100%',maxWidth:'300px',alignSelf:'center'}} src={'/icei.png'} alt="backgroundleft" />

        <section id="ky_box_swap" style={{ width:'35%', minWidth:'500px',borderRadius:'35px',zIndex:'99',textAlign:'left',padding:'25px' }}>
          <p style={{marginTop:'25px'}}> Token balance  </p>
          <input type="text" />
          <p> Recepient  </p>
          <input type="text" />
        </section>

        <img style={{ width:'100%',maxWidth:'300px', alignSelf:'center',height:'463px',marginLeft:'25px'}} src={'/icej.png'} alt="backgroundright" />
 

      </div>      
    
  </div>
  );
}