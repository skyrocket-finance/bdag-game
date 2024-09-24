import React from "react";
import { Web3ReactProvider } from "@web3-react/core";

import MetaMaskBtn from "./components/MetaMaskBtn";
import { connectors } from "./connectors";
import logo from "./logo.svg";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TopNavigationLayout } from "./components/TopNavigationLayout";
import Home from "./pages/Home";
import { AppGame } from "./pages/AppGame";
import { Page404 } from "./pages/errors/Page404";
import Container from "react-bootstrap/Container";

function App() {
  return (
    <Web3ReactProvider connectors={connectors}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TopNavigationLayout/>}>
            <Route index element={<Home/>}/>
            <Route path='/AppGame' element={<AppGame/>}/>
            <Route path="*" element={<Page404/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </Web3ReactProvider>
  );
}

export default App;
