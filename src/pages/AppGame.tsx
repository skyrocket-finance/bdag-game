import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import { useEffect, useState } from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Store from "./AppGame/Store";
import Profile from "./AppGame/Profile";
import Battle from "./AppGame/Battle";

const SkyRocketNFTFactoryContract = require('../ABI/SkyRocketNFTFactoryContract.json');

export const AppGame = () => {
  const {connector, account} = useWeb3React();
  const [totalOwnedNFTS, setTotalOwnedNFTS] = useState<number>(0);
  const [ownedNFTsDNA, setOwnedNFTsDNA] = useState<any[]>([]);

  const web3 = new Web3(connector.provider);

  const nftContractAddress = '0x8012be7F96f3194E6677D9628218Ff2F4930d7d8';
  const contract = new web3.eth.Contract(SkyRocketNFTFactoryContract, nftContractAddress);

  function setTotalOwnedNFTsFunc(fake: number) {
    setTotalOwnedNFTS(fake);
  }

  useEffect(() => {
    // Define the async function inside the useEffect
    const fetchData = async () => {
      if (account) {
        try {
          // eslint-disable-next-line
          const res = await contract.methods.getTotalOwnedNFTs(account).call({from: account});
          // @ts-ignore
          let totalOwnedNFTs = parseInt(res.toString().split('n')[0]);
          // @ts-ignore
          setTotalOwnedNFTS(totalOwnedNFTs);
          // @ts-ignore
          // eslint-disable-next-line
          const ownedNFTids = await contract.methods.getOwnedNFTs(account).call();

          let ownedNFTsDNA = [];
          // @ts-ignore
          for (let i = 0; i < ownedNFTids.length; i++) {
            // @ts-ignore
            console.log('ownedNFT[i]', ownedNFTids[i]);
            // @ts-ignore
            let nftID = ownedNFTids[i].toString().split('n')[0];
            // @ts-ignore
            // eslint-disable-next-line
            let nftDNA = await contract.methods.getDNAByNFTId(nftID).call();
            // @ts-ignore
            console.log('nftDNA', nftDNA);
            ownedNFTsDNA.push({
              dna: nftDNA,
              nft_id: nftID
            });
          }
          setOwnedNFTsDNA(ownedNFTsDNA);


        } catch (e) {
          console.log('error', e);
        }

        // @ts-ignore
        // eslint-disable-next-line
        const res = await web3.eth.getBalance(account);
        console.log('res', res);
        // setTotalOwnedNFTS(parseInt(res.toString()));
      }
    };

    fetchData();

  // eslint-disable-next-line
  }, [account, totalOwnedNFTS]);

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
          <Tabs
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            className="mb-3 text-white-50"
          >
            <Tab eventKey="profile" title="Profile">
              <Profile ownedDNA={ownedNFTsDNA}/>
            </Tab>

            <Tab eventKey="store" title="Store">
              <Store ownedDNA={ownedNFTsDNA} setTotalOwnedNFTsFunc={setTotalOwnedNFTsFunc}/>
            </Tab>

            <Tab eventKey="battle" title="Battle">
              <Battle ownedDNA={ownedNFTsDNA} setTotalOwnedNFTsFunc={setTotalOwnedNFTsFunc}/>
            </Tab>
          </Tabs>

          <br/>

          <br/>
        </Col>

      </Row>
    </Container>

  )
}
