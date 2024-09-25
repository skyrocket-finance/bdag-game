import React from 'react'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Home = () => {

  return (
    <Container className={"mx-auto"}>
      <hr className="mt-2 mb-3"/>
      <Row xs={"10"}>

        <Col xs="12" className={'pixel-box--primary pixel-borders--2'}>

          {/*//<!-- Hero Section -->*/}
          <header className="text-white text-center py-5">
            <div className="container">
              <h1 className="display-4">Unleash Your NFT's Power in the Ultimate Battle Arena</h1>
              <p className="lead">Welcome to the NFT Battle Arena, where your NFTs aren't just collectibles – they're your champions!</p>
              <a href="/AppGame" className="btn btn-light btn-lg mt-4">Start Your First Battle</a>
            </div>
          </header>

          {/*// <!-- About the Game Section -->*/}
          <section className="py-5">
            <div className="container text-center">
              <h2 className="mb-4">What is NFT Battle Arena?</h2>
              <p className="text-muted">NFT Battle Arena is a revolutionary mini-game platform that allows you to take your NFT collectibles to the next level. Battle with other players in real-time, using your NFTs to strategize, compete, and win exclusive rewards. Every battle is unique, and your NFTs' abilities evolve with every victory!</p>
            </div>
          </section>

          {/*// <!-- Features Section -->*/}
          <section className="py-5 ">
            <div className="container">
              <div className="row text-center">
                <div className="col-md-4">
                  <div className="icon-box">
                    <i className="fas fa-fire-alt fa-3x text-danger mb-3"></i>
                    <h4 className="mb-3">Dynamic NFT Battles</h4>
                    <p className="text-muted">Engage in thrilling battles where each NFT has its own unique abilities and strategies.</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="icon-box">
                    <i className="fas fa-trophy fa-3x text-warning mb-3"></i>
                    <h4 className="mb-3">Earn Rewards</h4>
                    <p className="text-muted">Win battles to earn valuable rewards, rare NFTs, and more!</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="icon-box">
                    <i className="fas fa-chart-line fa-3x text-success mb-3"></i>
                    <h4 className="mb-3">Level Up</h4>
                    <p className="text-muted">Power up your NFTs with each battle and unlock special abilities.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/*// <!-- Call to Action -->*/}
          <section className="py-5 text-center text-white">
            <div className="container">
              <h2 className="mb-4">Ready to Enter the Arena?</h2>
              <p className="lead">Join thousands of players and discover the future of NFT gaming. Assemble your team and start battling today!</p>
              <a href="/AppGame" className="btn btn-primary btn-lg">Join Now</a>
            </div>
          </section>
          
        </Col>

      </Row>
    </Container>
  )
}

export default Home;