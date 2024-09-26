import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import React, { useEffect, useState } from "react";

import { CharRocket } from "../../components/CharRocket";


const SkyRocketStoreContract = require('../../ABI/SkyRocketStoreContract.json');

interface StoreProps {
  ownedDNA?: any[],
  setTotalOwnedNFTsFunc?: (fake: number) => void
}

const Store = ({ownedDNA, setTotalOwnedNFTsFunc}: StoreProps) => {
  const {connector, account} = useWeb3React();
  const [transactionHash, setTransactionHash] = useState<string>("");
  const [sellNFTId, setSellNFTId] = useState<string>("");
  const [approved, setApproved] = useState<boolean>(false);

  const web3 = new Web3(connector.provider);

  const storeContractAddress = '0x653C5dC5f7f87A2E6260aA5Be71AB0172Ed865a2';
  const contract = new web3.eth.Contract(SkyRocketStoreContract, storeContractAddress);

  function buyNFT() {
    try {
      // @ts-ignore
      // eslint-disable-next-line
      contract.methods.buySkyRocketNFT().send({
        from: account,
        value: "100000000000000000",
        gasPrice: Web3.utils.toWei("5", "gwei"),
        gas: Web3.utils.toWei("0.0000000000005", "ether")
      })
        .on('receipt', function (receipt: any) {
          console.log('receipt', receipt);
          setTransactionHash(receipt.transactionHash);
          if (setTotalOwnedNFTsFunc) {
            setTotalOwnedNFTsFunc(1);
          }
        })
        .on('error', function (error: any) {
          console.log('error', error);
        });
    } catch (e) {
      console.log('error', e);
    }
  }

  function sellNFT(nftId: string) {
    try {
      console.log('nftId', nftId);
      // @ts-ignore
      // eslint-disable-next-line
      contract.methods.sellSkyRocketNFT(nftId).send({
        from: account,
        gasPrice: Web3.utils.toWei("5", "gwei"),
        gas: Web3.utils.toWei("0.0000000000005", "ether")
      })
        .on('receipt', function (receipt: any) {
          console.log('receipt', receipt);
          setTransactionHash(receipt.transactionHash);
          if (setTotalOwnedNFTsFunc) {
            setTotalOwnedNFTsFunc(1);
          }
          setSellNFTId("");
        })
        .on('error', function (error: any) {
          console.log('error', error);
        });
    } catch (e) {
      console.log('error', e);
    }
  }

  useEffect(() => {
    const isApproved = async () => {
      if (account) {
        console.log('account', account);
        try {
          // eslint-disable-next-line
          const SkyRocketNFTFactoryContract = require('../../ABI/SkyRocketNFTFactoryContract.json');
          const nftContractAddress = '0xA6d20B0696BAfc8f13232efe97FE52106b8759F2';
          const nftContract = new web3.eth.Contract(SkyRocketNFTFactoryContract, nftContractAddress);
          const res = await nftContract.methods.isApprovedForAll(account, storeContractAddress).call();
          console.log('res', res);
          // @ts-ignore
          setApproved(res);
        } catch (e) {
          console.log('error', e);
        }
      }
    }

    if (transactionHash) {
      console.log('transactionHash', transactionHash);
    }

    if (sellNFTId) {
      sellNFT(sellNFTId);
    }

    if (!approved) {
      // Check if the contract is approved
      console.log('isApproved: ', approved);
      isApproved();
    }

    // eslint-disable-next-line
  }, [transactionHash, sellNFTId, account]);

  if (!account) {
    return (
      <Container className={"mx-auto"}>
        <hr className="mt-2 mb-3"/>
        <Row xs={"10"}>

          <Col xs="12" className={'pixel-box--primary pixel-borders--2 min-h-px-250 align-content-center text-center'}>
            <h1>
              Connect your wallet to see the Store first
            </h1>
          </Col>
        </Row>
      </Container>
    )
  }

  if (!approved) {
    return (
      <Container className={"mx-auto"}>
        <hr className="mt-2 mb-3"/>
        <Row xs={"10"}>

          <Col xs="12" className={'pixel-box--primary pixel-borders--2 min-h-px-250 align-content-center text-center'}>
            <h6>
              You need to approve the contract first
            </h6>

            <button className={"pixel-box--primary pixel-box--success-custom pixelart-buy-nft"} onClick={() => {
              const SkyRocketNFTFactoryContract = require('../../ABI/SkyRocketNFTFactoryContract.json');
              const nftContractAddress = '0x8012be7F96f3194E6677D9628218Ff2F4930d7d8';
              const nftContract = new web3.eth.Contract(SkyRocketNFTFactoryContract, nftContractAddress);

              // @ts-ignore
              nftContract.methods.setApprovalForAll(storeContractAddress, true).send({
                from: account
              })
                .on('receipt', function (receipt: any) {
                  console.log('receipt', receipt);
                  setApproved(true);
                })
                .on('error', function (error: any) {
                  console.log('error', error);
                });
            }}>Approve
            </button>
          </Col>
        </Row>
      </Container>
    )
  }

  return (
    <Container className={"mx-auto"}>
      <hr className="mt-2 mb-3"/>
      <Row xs={"10"}>

        <h2 id={"buy-nft"}>Buy NFTs</h2>
        <Col xs="12" md={"12"} lg={"12"} className={'pixel-box--primary pixel-borders--2 '}>

          Buy a SkyRocket NFT for 5 BDAG
          <br/>
          <br/>
          <button className={"pixel-box--primary pixel-box--success-custom pixelart-buy-nft"} onClick={buyNFT}>Buy
          </button>

        </Col>

        <hr className="mt-2 mb-3"/>

        <h2 id={"sell-nft"}>Sell NFTs</h2>
        <Col xs="12" md={"12"} lg={"12"} className={'pixel-box--primary pixel-borders--2 '}>
          <span>Sell a SkyRocket NFT for 2.5 BDAG. Click on any NFT</span><br/>
          {ownedDNA && ownedDNA.length === 0 ?
            <div>
              You do not have any NFTs yet. Go to the store to buy some!
            </div>
            : ownedDNA && ownedDNA.map((dna, index) => {
            return (
              <>
                <a href={"#1"} id={dna.nft_id} onClick={()=>setSellNFTId(dna.nft_id)}>
                    <CharRocket key={index} dna={dna}/>
                </a>
              </>
            );
          })}

        </Col>

      </Row>
    </Container>

  )
}

export default Store;