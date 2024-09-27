import React, { useEffect } from "react";
import { Web3ReactProvider } from "@web3-react/core";

import { connectors } from "./connectors";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TopNavigationLayout } from "./components/TopNavigationLayout";
import Home from "./pages/Home";
import { AppGame } from "./pages/AppGame";
import { Page404 } from "./pages/errors/Page404";
import { FooterLayout } from "./components/FooterLayout";
import ToonFight from "./components/ToonFight";

function App() {
  const [showToonFight, setShowToonFight] = React.useState(false);

  function showToonFightFunc(val: boolean) {
    setShowToonFight(val);
  }

  useEffect(() => {

  }, [showToonFight]);

  return (
    <>
      <Web3ReactProvider connectors={connectors}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TopNavigationLayout/>}>
              <Route index element={<Home/>}/>
              <Route index path='/AppGame' element={<AppGame showToonFightFunc={showToonFightFunc}/>}/>
              <Route index path="*" element={<Page404/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
        <br/>
        <FooterLayout/>

      </Web3ReactProvider>

      {showToonFight && <ToonFight/>}
    </>

  );
}

export default App;
