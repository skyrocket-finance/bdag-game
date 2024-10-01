import React from "react";


export const FooterLayout = () => {
  const currentYear = new Date().getFullYear(); // Get the current year dynamically

  return (
    <footer className="text-white text-center py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5>About Us</h5>
            <p className="text-white-50">
              NFT Battle Arena is the future of NFT gaming, where collectibles come to life in epic battles. Join us and revolutionize the way you experience NFTs!
            </p>
          </div>
          <div className="col-md-4 mb-3">
            <h5>Follow Us</h5>
            {/*<div className="d-flex justify-content-center">*/}
            {/*  <a href="#" className="text-white mx-3">*/}
            {/*    <i className="fab fa-twitter fa-2x"></i>*/}
            {/*  </a>*/}
            {/*  <a href="#" className="text-white mx-3">*/}
            {/*    <i className="fab fa-discord fa-2x"></i>*/}
            {/*  </a>*/}
            {/*  <a href="#" className="text-white mx-3">*/}
            {/*    <i className="fab fa-instagram fa-2x"></i>*/}
            {/*  </a>*/}
            {/*</div>*/}
          </div>
          <div className="col-md-4 mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled ">
              <li><a href="https://coinmarketcap.com/" target='_blank' rel="noreferrer" className="text-white-50">CoinMarketCap</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-3">
          <p>&copy; {currentYear} <span className={'brand'}>SkyRocket.</span> All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

