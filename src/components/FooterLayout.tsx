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

            <div className="">

              <a href="https://x.com/Skyrocket_fi" className="text-white mx-3" target="_blank" rel="noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                     className="bi bi-twitter-x" viewBox="0 0 16 16">
                  <path
                    d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
                </svg>
              </a>

              <a href="https://t.me/skyrocket_fi_chat" className="text-white mx-3" target="_blank" rel="noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                     className="bi bi-telegram" viewBox="0 0 16 16">
                  <path
                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09"/>
                </svg>
              </a>

            </div>
          </div>

          <div className="col-md-4 mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled ">
              {/*<li>*/}
              {/*  <a href="https://coinmarketcap.com/" target='_blank' rel="noreferrer"*/}
              {/*     className="text-white-50">CoinMarketCap</a>*/}
              {/*</li>*/}

              <li>
                <a href="https://sonicscan.org/address/0x24a183e82b56bc4fb4cdb111e58a489a6fab054f#code" target='_blank' rel="noreferrer"
                   className="text-white-50">Contract NFT</a>
              </li>
              <li>
                <a href="https://sonicscan.org/address/0x24a183E82B56bc4fb4cDb111E58a489A6fab054f#code" target='_blank' rel="noreferrer"
                   className="text-white-50">Contract Store</a>
              </li>
              <li>
                <a href="https://sonicscan.org/address/0x46E74Db44037254E97d1198D2A96C59b333ffbda#code" target='_blank' rel="noreferrer"
                   className="text-white-50">Contract Battle</a>
              </li>

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

