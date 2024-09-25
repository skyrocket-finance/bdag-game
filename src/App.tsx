import React from "react";
import { Web3ReactProvider } from "@web3-react/core";

import { connectors } from "./connectors";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TopNavigationLayout } from "./components/TopNavigationLayout";
import Home from "./pages/Home";
import { AppGame } from "./pages/AppGame";
import { Page404 } from "./pages/errors/Page404";
import { FooterLayout } from "./components/FooterLayout";

function App() {
  return (
    <Web3ReactProvider connectors={connectors}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TopNavigationLayout/>}>
            <Route index element={<Home/>}/>
            <Route index path='/AppGame' element={<AppGame/>}/>
            <Route index path="*" element={<Page404/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
      <br/>
      <FooterLayout/>

    </Web3ReactProvider>
  );
}

export default App;
