/* eslint-disable */

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import React, { useEffect, useState } from "react";

import { CharRocket } from "../../components/CharRocket";

import Modal from 'react-bootstrap/Modal';
import {
  SKY_ROCKET_BATTLE_ADDRESS,
  SKY_ROCKET_NFT_FACTORY_ADDRESS
} from "../../utils/Constants";

interface BattleProps {
  ownedDNA?: any[],
  setTotalOwnedNFTsFunc?: (fake: number) => void,
  setFightResultArrayFunc?: (val: any[]) => void
}

const Battle = ({ownedDNA, setTotalOwnedNFTsFunc, setFightResultArrayFunc}: BattleProps) => {
  const {connector, account} = useWeb3React();
  const [show, setShow] = useState(false);
  let [createBattle, setCreateBattle] = useState(false);
  let [fightBattle, setFightBattle] = useState(false);
  const [selectedNFTId, setSelectedNFTId] = useState<string>("");
  const [selectedBattle, setSelectedBattle] = useState<string>("");
  const [approved, setApproved] = useState<boolean>(false);
  const [currentBattles, setCurrentBattles] = useState<any[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);

  const web3 = new Web3(connector.provider);

  function handleClose() {
    setShow(false);
  }

  function handleShow(createBattle: boolean = false, fightBattle: boolean = false) {
    setCreateBattle(createBattle);
    setFightBattle(fightBattle);
    setShow(true);
  }

  useEffect(() => {

    const getActiveBattles = async () => {
      const SkyRocketBattleContract = require('../../ABI/SkyRocketBattleContract.json');
      const battleContract = new web3.eth.Contract(SkyRocketBattleContract, SKY_ROCKET_BATTLE_ADDRESS);

      const SkyRocketNFTFactoryContract = require('../../ABI/SkyRocketNFTFactoryContract.json');
      const nftContract = new web3.eth.Contract(SkyRocketNFTFactoryContract, SKY_ROCKET_NFT_FACTORY_ADDRESS);

      let battles = await battleContract.methods.getCreatedBattles().call();
      // @ts-ignore
      let battleNum = parseInt(battles.toString().split('n')[0]) - 1;

      let battleArray = [];
      for (let i = 1; i <= battleNum; i++) {
        let battle = await battleContract.methods.getBattleDetails(i).call();

        // @ts-ignore
        if (battle[2].toString().split('n')[0] === "0") {
          continue;
        }

        // @ts-ignore
        if (battle[4] !== "0x0000000000000000000000000000000000000000") {
          continue
        }

        // @ts-ignore
        let battleObj = {  id: i, initiator: battle[0], opponent: battle[1], initiatorNFTId: battle[2], nft_id: battle[2].toString().split('n')[0], opponentNFTId: battle[3], winner: battle[4], dna: ""};
        battleObj.dna = await nftContract.methods.getDNAByNFTId(battleObj.initiatorNFTId).call();

        console.log('battleObj.dna', battleObj.dna);
        console.log('battleObj.nft_id', battleObj.nft_id);


        battleArray.push(battleObj);
        console.log('battle', battleArray);
      }

      setCurrentBattles(battleArray);

      console.log('battleNum', battleNum);
    }

    const isApproved = async () => {
      if (account) {
        try {
          // eslint-disable-next-line
          const SkyRocketNFTFactoryContract = require('../../ABI/SkyRocketNFTFactoryContract.json');
          const nftContract = new web3.eth.Contract(SkyRocketNFTFactoryContract, SKY_ROCKET_NFT_FACTORY_ADDRESS);
          const res = await nftContract.methods.isApprovedForAll(account, SKY_ROCKET_BATTLE_ADDRESS).call();
          // @ts-ignore
          setApproved(res);
        } catch (e) {
          console.log('error', e);
        }
      }
    }

    async function battle() {

      if (!selectedNFTId) {
        return;
      }

      const SkyRocketBattleContract = require('../../ABI/SkyRocketBattleContract.json');
      const battleContract = new web3.eth.Contract(SkyRocketBattleContract, SKY_ROCKET_BATTLE_ADDRESS);

      if (createBattle) {
          battleContract.methods.createBattle(selectedNFTId).send({
            from: account,
            gasPrice: Web3.utils.toWei("5", "gwei"),
            gas: Web3.utils.toWei("0.0000000000005", "ether")
          }).then(async function (receipt) {
            console.log('receipt', receipt);
          }).catch(e => {
            console.log('error', e);
          });
      }

      if (fightBattle) {
        setFightResultArrayFunc && setFightResultArrayFunc([true, ""]);

        try {
          battleContract.methods.joinBattleAndFight(selectedBattle, selectedNFTId).send({
            from: account,
            gasPrice: Web3.utils.toWei("5", "gwei"),
            gas: Web3.utils.toWei("0.0000000000005", "ether")
          }).then(async function (receipt) {

            let battle = await battleContract.methods.getBattleDetails(selectedBattle).call();
            console.log('battle', battle);
            console.log('account', account);

            // @ts-ignore
            if (!refresh) {
              setRefresh(true);
              // @ts-ignore
              setFightResultArrayFunc && setFightResultArrayFunc([false, battle[4]]);
            }

          }).catch(e => {
            if (!refresh) {
              setRefresh(true);
              setFightResultArrayFunc && setFightResultArrayFunc([false, ""]);
            }
          });
        } catch (e) {
          if (!refresh) {
            setRefresh(true);
            setFightResultArrayFunc && setFightResultArrayFunc([false, ""]);
          }
        }

        console.log('fightBattle', fightBattle);
        console.log('selectedNFTId', selectedNFTId);
      }

      setSelectedBattle("");
      setSelectedNFTId("");
    }

    battle();

    if (!approved) {
      // Check if the contract is approved
      isApproved();
    }

    getActiveBattles();

    if (refresh) {
      setRefresh(false);
      if (setTotalOwnedNFTsFunc) {
        setTotalOwnedNFTsFunc(2);
      }
    }

  }, [selectedNFTId, refresh]);


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
              const nftContract = new web3.eth.Contract(SkyRocketNFTFactoryContract, SKY_ROCKET_NFT_FACTORY_ADDRESS);

              // @ts-ignore
              nftContract.methods.setApprovalForAll(SKY_ROCKET_BATTLE_ADDRESS, true).send({
                from: account
              })
                .on('receipt', function (receipt: any) {
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
    <>
      <Container className={"mx-auto"}>
        <hr className="mt-2 mb-3"/>
        <Row xs={"10"}>

          <h2 id={"create-battle"}>Create a NFT Battle</h2>
          <Col xs="12" md={"12"} lg={"12"} className={'pixel-box--primary pixel-borders--2'}>
            <hr className="mt-2 mb-3"/>
            Click on the button and select your NFTs to create a battle<br/>
            <hr className="mt-2 mb-3"/>
            <button className={"pixel-box--primary pixel-box--success-custom pixelart-buy-nft"} onClick={() => {
              handleShow(createBattle = true, fightBattle = false);
            }}>
              Battle Create!
            </button>

          </Col>

          <hr className="mt-2 mb-3"/>

          <h2 id={"sell-nft"}>FIGHT (and win)</h2>
          <Col xs="12" md={"12"} lg={"12"} className={'pixel-box--primary pixel-borders--2 '}>
            <hr className="mt-2 mb-3"/>
            <span className={"text-center align-content-center"}>Fight one of the battles and WIN the NFT, or lose yours...</span>
            <hr className="mt-2 mb-3"/>
            <div className={"container"}>
              <div className={"row"}>
                {currentBattles && currentBattles.length === 0 ?
                  <div>
                    There are no battles going on right now, create one!
                  </div>
                  : currentBattles && currentBattles.map((currentBattle, index) => {
                  return (
                    <>
                      <div className={"col"}>
                        <CharRocket key={index} dna={currentBattle}/>

                        {(currentBattle.initiator === account ?

                            <button className={"pixel-box--warning text-black-50 battle-button"} onClick={() => {
                              const SkyRocketBattleContract = require('../../ABI/SkyRocketBattleContract.json');
                              const battleContract = new web3.eth.Contract(SkyRocketBattleContract, SKY_ROCKET_BATTLE_ADDRESS);

                              battleContract.methods.cancelBattle(currentBattle.id).send({
                                from: account,
                                gasPrice: Web3.utils.toWei("5", "gwei"),
                                gas: Web3.utils.toWei("0.0000000000005", "ether")
                              })
                                .on('receipt', function (receipt: any) {

                                  if (!refresh) {
                                    setRefresh(true);
                                  }

                                })
                                .on('error', function (error: any) {
                                  console.log('error', error);
                                });

                            }}>
                              Cancel
                            </button>
                            :
                            <button className={"pixel-box--success text-black-50 battle-button"} onClick={() => {
                              setSelectedBattle(currentBattle.id);
                              handleShow(createBattle = false, fightBattle = true);
                            }}>
                              Fight
                            </button>

                        )}

                      </div>
                    </>
                  );
                })}
              </div>
            </div>
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
