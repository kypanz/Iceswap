/*
    This button is used for login with moralis using metamask
*/
import React from "react";
import { useMoralis } from "react-moralis";

export default function LoginMoralisButton() {

    const { authenticate, isAuthenticated, user } = useMoralis();

    if (!isAuthenticated) {
      return (
        <div>
          <button onClick={() => authenticate()}>Connect Metamask</button>
        </div>
      );
    }
  
    return (
      <div>
        <h1>Welcome {user.get("username")}</h1>
      </div>
    );

}
