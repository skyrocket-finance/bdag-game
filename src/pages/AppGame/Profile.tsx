import React from 'react'
import { CharRocket } from "../../components/CharRocket";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

interface ProfileProps {
  ownedDNA?: any[]
}

const Profile = ({ownedDNA}: ProfileProps) => {
  console.log(ownedDNA);
  return (
    <>

      <Container className={"mx-auto"}>
        <hr className="mt-2 mb-3"/>
        <Row xs={"10"}>

          <Col xs="12" md={"12"} lg={"12"} className={'pixel-box--primary pixel-borders--2 '}>

            {ownedDNA && ownedDNA.length === 0 ?
              <div>
                You do not have any NFTs yet. Go to the store to buy some!
              </div>
              : ownedDNA && ownedDNA.map((dna, index) => {
              return (
                <>
                  <a href={'#' + dna.nft_id}>
                    <CharRocket key={index} dna={dna}/>
                  </a>
                </>
              );
            })}

          </Col>

        </Row>
      </Container>

    </>
  )
}

export default Profile;
