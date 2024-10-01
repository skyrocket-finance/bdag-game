import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import {
  SKY_ROCKET_CHAIN_BLOCK_EXPLORER,
  SKY_ROCKET_CHAIN_ID,
  SKY_ROCKET_CHAIN_NAME,
  SKY_ROCKET_CHAIN_NETWORK_CURRENCY,
  SKY_ROCKET_CHAIN_RPC_URLS
} from "../../utils/Constants";

const MetaMaskBtn = () => {
  const [loading, setLoading] = useState(false);
  const {connector, hooks} = useWeb3React();
  const {useSelectedAccount} = hooks;
  const account = useSelectedAccount(connector);

  const chainIdHex = Web3.utils.toHex(SKY_ROCKET_CHAIN_ID);

  const loginWithMetaMask = async () => {
    setLoading(true);
    try {
      await connector.activate(SKY_ROCKET_CHAIN_ID);
    } catch (err) {
      console.log("User rejected the request", err);
      setLoading(false);
    }
  }

  const onConnectMetaMask = async () => {

    try {
      if (
        SKY_ROCKET_CHAIN_ID &&
        window.ethereum &&
        window.ethereum.networkVersion !== SKY_ROCKET_CHAIN_ID
      ) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{chainId: chainIdHex}]
          }).then(async (result: any) => {
            await loginWithMetaMask();
          });
        } catch (err: any) {
          // This error code indicates that the chain has not been added to MetaMask
          if (err.code === 4902) {
            console.log("Chain not added to MetaMask......");
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: chainIdHex,
                  chainName: SKY_ROCKET_CHAIN_NAME,
                  nativeCurrency: SKY_ROCKET_CHAIN_NETWORK_CURRENCY,
                  rpcUrls: SKY_ROCKET_CHAIN_RPC_URLS,
                  blockExplorerUrls: SKY_ROCKET_CHAIN_BLOCK_EXPLORER,
                }
              ]
            }).then(async (result: any) => {
              await loginWithMetaMask();
            });
          }
        }
      } else {
        await loginWithMetaMask();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const onDisconnectMetaMask = () => {
  //   if (connector?.deactivate) {
  //     connector.deactivate();
  //   } else {
  //     connector.resetState();
  //   }
  // };

  useEffect(() => {
    // actually, you can implement some kinds of sign functions here
    if (account) setLoading(false);
  }, [account]);

  const metaMaskPixelArtImg = require("../../assets/images/metamask-pixel-art.png");
  return (
    <>
      {account ? (
        <>
          <div className="container metamask-login">
            <div className="row">
              <div className="col-auto p-2">
                Connected with:
              </div>
              <div className="col-auto p-2">
                {account.slice(0, 8)}...
              </div>
            </div>
          </div>
        </>
      ) : (
        <button
          className={'metamask-button center'}
          disabled={loading}
          onClick={onConnectMetaMask}
        >
          <img
            src={metaMaskPixelArtImg} alt="MetaMask"
            width={16}
            height={15}
          />
        </button>
      )}
    </>
  );
};

export default MetaMaskBtn;
