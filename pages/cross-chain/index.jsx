import React, { useState } from 'react'
import { providers, Wallet } from "ethers"; // <-- this need to be change
import { Bitcoin, Ethereum, Polygon } from "@renproject/chains";
import RenJS from "@renproject/ren";
import { useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';

// Test account - do not send real funds.
const mnemonic = "black magic humor turtle symptom liar salmon rally hurt concert tower run"; // <-- delete this line before mumbai connection works fine again

// Setting the network
const network = "testnet";

export default function index() {

    // variables
    const [walletToDeposit,setWalletToDeposit] = useState();
    const [status,setStatus] = useState(null);
    const [message, setMessage] = useState(null);

    const doIt = async () => {

        try {

            setStatus('loading');
            setMessage('Request in progress ...');

            // Initialize Bitcoin and Polygon.
            const bitcoin = new Bitcoin({ network });
            
            await window.ethereum.request({ method: "eth_requestAccounts" });
            const polygon = new Polygon({
                network,
                provider: window.ethereum
            });
            
            // Create RenJS instance. NOTE - chains must now be linked to RenJS using
            // `withChains`.
            const renJS = new RenJS(network).withChains(bitcoin, polygon);

            console.log('doing the gateway process ...')
            
            // Create gateway - mints and burns are both initialized with `gateway`.
            // Gateway parameters are serializable.
            const gateway = await renJS.gateway({
                asset: bitcoin.assets.BTC, // "BTC"
                from: bitcoin.GatewayAddress(),
                to: polygon.Account(),
            });
                
            // `gateway.fees` exposes values and helpers for calculating fees.
            console.log(gateway.fees);

            console.log(`Deposit ${gateway.params.asset} to ${gateway.gatewayAddress}`);

            // NOTE: Event has been renamed from "deposit" to "transaction".
            gateway.on("transaction", (tx) => {
                (async () => {
                    // GatewayTransaction parameters are serializable. To re-create
                    // the transaction, call `renJS.gatewayTransaction`.
                    console.log(tx.params);

                    // Wait for remaining confirmations for input transaction.
                    await tx.in.wait();

                    // RenVM transaction also follows the submit/wait pattern.
                    await tx.renVM.submit().on("progress", ()=>{
                        setMessage('Waiting transaction result ...')
                        console.log
                    });
                    await tx.renVM.wait();

                    // `submit` accepts a `txConfig` parameter for overriding
                    // transaction config.
                    await tx.out.submit({
                        txConfig: {
                            gasLimit: 1000000,
                        },
                    });
                    await tx.out.wait();

                    // All transactions return a `ChainTransaction` object in the
                    // progress, with a `txid` field (base64) and a `txidFormatted`
                    // field (chain-dependent).
                    const outTx = tx.out.progress.transaction;
                    console.log("Done:", outTx.txidFormatted);

                    // All chain classes expose a common set of helper functions (see
                    // `Chain` class.)
                    console.log(tx.toChain.transactionExplorerLink(outTx));

                })().catch(console.error);
            });

        } catch (error) {
            console.log(error);
            alert('are you in polygon mumbai network ?, please check');
        }

    }

    useEffect(()=>{

    },[])

  return (
    <div className="App">

        <h1> Cross chain </h1>
        <p style={{fontSize:'0.9em',background:'coral',padding:'15px',borderRadius:'15px',width:'35%',margin:'auto'}}> 
            This is a demo cross-chain, we are implementing more chains, this section can has issues if the mumbai test network has much traffic
        </p>

        <section id="box_cross_chain">
            <p> From BTC </p>
            <img src="https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/1024/Bitcoin-BTC-icon.png" alt="btc_image" width="50px" height="50px" />
            <p style={{marginTop:'25px'}}> To Polygon </p>
            <img src="https://cdn.iconscout.com/icon/free/png-256/polygon-token-4086724-3379854.png" alt="polygon_image" width="50px" height="50px" />
            <br />
            {(status == 'loading') ? <p style={{marginTop:'35px'}}>  {message} <Spinner animation="grow" style={{marginLeft:'15px'}} /> </p> : null }
            <br />
            <button onClick={doIt} id="change_cross_chain_button" > Change </button>

        </section>
    </div>
  )
}
