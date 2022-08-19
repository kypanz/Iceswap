/*
    This button is used for login with moralis using metamask
*/
import React from "react";
import { useMoralis } from "react-moralis";

export default function LoginMoralisButton() {

    const { authenticate, logout, isAuthenticated, isAuthenticating, user } = useMoralis();

    if (!isAuthenticated) {
      return (
        <div style={{paddingTop:'5px'}}>
          <button onClick={() => authenticate({signingMessage: "IceSwap wants to connect with your Metmask"})} disabled={isAuthenticating} style={{
            background:'#7a1c96',
            borderRadius:'35px',
            padding:'5px',
            paddingLeft:'15px',
            paddingRight:'15px',
            color:'white',
            border:'0px'
          }}>Connect Metamask</button>
        </div>
      );
    }

    console.log(user);
  
    return (
      <div style={{display:'flex', paddingTop:'5px'}}>
      
        <p style={{
          color:'white',
          background:'#7a1c96',
          padding:'5px',
          borderRadius:'5px'
          }}>Welcome {user.get("username")}</p>
          
          <button onClick={()=>logout()} disabled={isAuthenticating} style={{
            background:'#7a1c96',
            borderRadius:'5px',
            border:'0px',
            marginLeft:'5px',
            height:'35px',
            paddingLeft:'20px',
            paddingRight:'20px',
            color:'white'
          }}> Logout </button>
      
      </div>
    );

}
