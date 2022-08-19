/*

    This function gonna has a iframe to integrate the fiat => crytpo, for buy
    @kypanz
    @https://kypanz.github.io/

*/

import React from 'react'
import Moralis from 'moralis';
import { useEffect } from 'react';

export default function MoralisFiat() {

    // For connection with moralis server
    Moralis.initialize(process.env.NEXT_PUBLIC_APP_ID);
    Moralis.serverURL = process.env.NEXT_PUBLIC_SERVER_URL;

    const buyInIframe = async () => {
        await Moralis.initPlugins();
        let response = await Moralis.Plugins.fiat.buy({}, { disableTriggers: true });
        document.getElementById("fiat_box").style.display = "block";
        document.getElementById("fiat_box").src = response.data;
    }

    useEffect(()=>{
        window.onload = buyInIframe();
    },[])
    
  return (
    <div>
        <p> You can buy here crypto using fiat </p>
        <p style={{background:'coral',width:'35%',margin:'auto',padding:'15px',borderRadius:'15px', fontSize:'13px'}}> Please use fake data, is only for example for iceswap integration ...  </p>
        <div style={{display:'flex'}}>
            <div style={{width:'45%',marginLeft:'35px',background:'transparent',marginTop:'15px'}}>
            <h2 style={{textAlign:'left'}}> Testing Data ... </h2>
            <div style={{width:'100%',background:'white',borderRadius:'15px',marginTop:'15px',color:'black',textAlign:'left',padding:'25px',fontSize:'1.2em'}} >
                <p>Select <span style={{color:'coral'}}> "Wyre" </span> method </p>
                <p>Address => <span style={{color:'coral'}}> 2N3oefVeg6stiTb5Kh3ozCSkaqmx91FDbsm </span> </p>
                <p>Test card number => <span style={{color:'coral'}}> 4111 1111 1111 1111 </span> <span style={{color:'#25225c'}}>01/2023</span> <span style={{color:'coral'}}>123</span></p>
                <p>2FA codes (sms/card) 000000</p>
            </div>
            </div>
            <iframe id="fiat_box" src="" width="650" height="650" style={{margin:'15px',float:'right'}}></iframe>
        </div>
    </div>
  )
}
