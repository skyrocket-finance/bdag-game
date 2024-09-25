import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";

const MetaMaskBtn = () => {
  const [loading, setLoading] = useState(false);
  const {connector, hooks} = useWeb3React();
  const {useSelectedAccount} = hooks;
  const account = useSelectedAccount(connector);

  const onConnectMetaMask = async () => {
    const chainId = process.env.SUPPORT_CHAIN_ID || "24171";
    try {

      console.log(window.ethereum)
      console.log(window.ethereum.networkVersion)
      console.log(window.ethereum.isMetaMask)
      if (
        chainId &&
        window.ethereum &&
        window.ethereum.networkVersion !== chainId
      ) {
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{chainId: Web3.utils.toHex(parseInt(chainId)), lookupAddress: "0x1"}],
          });
        } catch (err: any) {
          console.log("Network changed rejected", err);
        }
      } else {
        setLoading(true);
        try {
          await connector.activate(chainId);
        } catch (err) {
          console.log("User rejected the request", err);
          setLoading(false);
        }
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
