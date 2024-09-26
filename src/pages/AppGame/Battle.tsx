import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import React, { useEffect, useState } from "react";

import { CharRocket } from "../../components/CharRocket";

import Modal from 'react-bootstrap/Modal';

const SkyRocketStoreContract = require('../../ABI/SkyRocketStoreContract.json');

interface StoreProps {
  ownedDNA?: any[],
  setTotalOwnedNFTsFunc?: (fake: number) => void
}

interface BattleProps {
  ownedDNA?: any[],
  setTotalOwnedNFTsFunc?: (fake: number) => void
}

const Battle = ({ownedDNA, setTotalOwnedNFTsFunc}: BattleProps) => {
  const {connector, account} = useWeb3React();
  const [show, setShow] = useState(false);
  let [createBattle, setCreateBattle] = useState(false);
  let [fightBattle, setFightBattle] = useState(false);
  const [selectedNFTId, setSelectedNFTId] = useState<string>("");

  const web3 = new Web3(connector.provider);

  function handleClose(createBattle: boolean = false, fightBattle: boolean = false) {
    setShow(false);
  }

  function handleShow(createBattle: boolean = false, fightBattle: boolean = false) {
    setCreateBattle(createBattle);
    setFightBattle(fightBattle);
    setShow(true);
  }

  useEffect(() => {
    async function battle() {

      if (!selectedNFTId) {
        return;
      }

      const SkyRocketBattleContract = require('../../ABI/SkyRocketBattleContract.json');
      const battleContractAddress = '0x7a03F56cde49dA748dF76CEd5C2af657330A4E0f';
      const battleContract = new web3.eth.Contract(SkyRocketBattleContract, battleContractAddress);

      if (createBattle) {
        await battleContract.methods.createBattle(selectedNFTId).send({
          from: account,
          gasPrice: Web3.utils.toWei("5", "gwei"),
          gas: Web3.utils.toWei("0.0000000000005", "ether")
        });

        console.log('createBattle', createBattle);
        console.log('selectedNFTId', selectedNFTId);
      }

      if (fightBattle) {
        console.log('fightBattle', fightBattle);
        console.log('selectedNFTId', selectedNFTId);
      }

      setSelectedNFTId("");
    }

    battle();

  }, [selectedNFTId]);


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

  return (
    <>
      <Container className={"mx-auto"}>
        <hr className="mt-2 mb-3"/>
        <Row xs={"10"}>

          <h2 id={"create-battle"}>Create a NFT Battle</h2>
          <Col xs="12" md={"12"} lg={"12"} className={'pixel-box--primary pixel-borders--2 '}>

            Click on the button and select your NFTs to create a battle<br/>

            <button className={"pixel-box--primary pixel-box--success-custom pixelart-buy-nft"} onClick={() => {
              handleShow(createBattle = true, fightBattle = false);
            }}>
              Battle Create!
            </button>

          </Col>

          <hr className="mt-2 mb-3"/>

          <h2 id={"sell-nft"}>Sell NFTs</h2>
          <Col xs="12" md={"12"} lg={"12"} className={'pixel-box--primary pixel-borders--2 '}>
            <span>Sell a SkyRocket NFT for 2.5 BDAG. Click on any NFT</span><br/>


          </Col>

        </Row>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className={"pixel-box--primary pixel-borders pixel-borders-margin-0"}>
          <Modal.Title>Select your NFT</Modal.Title>
        </Modal.Header>
        <Modal.Body className={"pixel-box--primary pixel-borders pixel-borders-margin-0"}>
          {ownedDNA && ownedDNA.length === 0 ?
            <div>
              You do not have any NFTs yet. Go to the store to buy some!
            </div>
            : ownedDNA && ownedDNA.map((dna, index) => {
            return (
              <a href={"#1"} id={dna.nft_id} onClick={() => {
                setSelectedNFTId(dna.nft_id)
                handleClose();
              }}>
                <CharRocket key={index} dna={dna}/>
              </a>
            );
          })}
        </Modal.Body>

      </Modal>
    </>
  )
}


export default Battle;
