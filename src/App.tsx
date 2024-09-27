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
import WWCD from "./components/WinnerWinnerChickenDinner";

function App() {
  const [fightResultArray, setFightResultArray] = React.useState<any[]>([]);

  function setFightResultArrayFunc(val: any[]) {
    setFightResultArray(val);
  }

  useEffect(() => { }, [fightResultArray]);

  return (
    <>
      <Web3ReactProvider connectors={connectors}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TopNavigationLayout/>}>
              <Route index element={<Home/>}/>
              <Route index path='/AppGame' element={<AppGame setFightResultArrayFunc={setFightResultArrayFunc}/>}/>
              <Route index path="*" element={<Page404/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
        <br/>
        <FooterLayout/>

        {fightResultArray && fightResultArray[0] && <ToonFight/>}

        {fightResultArray && !fightResultArray[0] && <WWCD fightResultArray={fightResultArray} setFightResultArrayFunc={setFightResultArrayFunc}/>}

      </Web3ReactProvider>
    </>

  );
}

export default App;
