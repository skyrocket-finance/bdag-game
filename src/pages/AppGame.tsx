import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import logo from "../assets/images/logo.svg";

import { CharRocket } from "../components/CharRocket";

import { SkyRocketNFTFactoryABI } from '../ABI/SkyRocketNFTFactory';
import MetaMaskBtn from "../components/MetaMaskBtn";


export const AppGame = () => {


  return (
    <Container className={"mx-auto"}>
      <hr className="mt-2 mb-3"/>
      <Row xs={"10"}>

        <Col xs="12" className={'pixel-box--primary pixel-borders--2'}>
          <br/>

          <CharRocket dna={11111111111}/>


          <br/>
        </Col>

      </Row>
    </Container>

  )
}
