import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { CharRocket } from "../components/CharRocket";

import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import { useEffect, useState } from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const SkyRocketNFTFactoryContract = require('../ABI/SkyRocketNFTFactoryContract.json');

export const AppGame = () => {
  const {connector, chainId, account} = useWeb3React();
  const [totalOwnedNFTS, setTotalOwnedNFTS] = useState<number>(0);
  const [ownedNFTsDNA, setOwnedNFTsDNA] = useState<any[]>([]);

  // const provider = new Web3.providers.HttpProvider("https://rpc-testnet.bdagscan.com");

  const web3 = new Web3(connector.provider);

  const nftContractAddress = '0x65d8C59A4bE02ED7Af3E521FdbBdBf2B5F4996e4';
  const contract = new web3.eth.Contract(SkyRocketNFTFactoryContract, nftContractAddress);

  useEffect(() => {
    // Define the async function inside the useEffect
    const fetchData = async () => {
      if (account) {
        try {
          const res = await contract.methods.getTotalOwnedNFTs(account).call({from: account});
          // @ts-ignore
          let totalOwnedNFTs = parseInt(res.toString().split('n')[0]);
          // @ts-ignore
          setTotalOwnedNFTS(totalOwnedNFTs);

          const ownedNFTids = await contract.methods.getOwnedNFTs(account).call();

          let ownedNFTsDNA = [];
          // @ts-ignore
          for(let i = 0; i < ownedNFTids.length; i++) {
            // @ts-ignore
            console.log('ownedNFT[i]', ownedNFTids[i]);
            // @ts-ignore
            let nftID = ownedNFTids[i].toString().split('n')[0];
            let nftDNA = await contract.methods.getDNAByNFTId(nftID).call();
            // @ts-ignore
            console.log('nftDNA', nftDNA);
            ownedNFTsDNA.push(nftDNA);
          }
          setOwnedNFTsDNA(ownedNFTsDNA);


        } catch (e) {
          console.log('error', e);
        }


        const res = await web3.eth.getBalance(account);
        console.log('res', res);
        // setTotalOwnedNFTS(parseInt(res.toString()));
      }
    };

    fetchData();

  }, [account]);

  if (!account) {
    return (
      <Container className={"mx-auto"}>
        <hr className="mt-2 mb-3"/>
        <Row xs={"10"}>

          <Col xs="12" className={'pixel-box--primary pixel-borders--2 min-h-px-250 align-content-center text-center'}>
            <h1>
              Connect your wallet to see your NFTs
            </h1>
          </Col>
        </Row>
      </Container>
    )
  }

  return (
    <Container className={"mx-auto"}>
      <hr className="mt-2 mb-3"/>
      <Row xs={"10"}>

        <Col xs="12" className={'pixel-box--primary pixel-borders--2'}>
          {totalOwnedNFTS}<br/>

          <Tabs
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="home" title="Home">
              Tab content for Home
            </Tab>
            <Tab eventKey="profile" title="Profile">
              Tab content for Profile
            </Tab>
            <Tab eventKey="contact" title="Contact" disabled>
              Tab content for Contact
            </Tab>
          </Tabs>

          <br/>

          {ownedNFTsDNA.map((dna, index) => {

            return <CharRocket key={index} dna={dna} />;
          })}

          <br/>
        </Col>

      </Row>
    </Container>

  )
}
