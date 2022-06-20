import React, { createRef } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/footer";
import NotFound from "./components/not-found";
import TopNav from "./components/topnav";

import { SubstrateContextProvider, useSubstrateState } from "./libs/substrate";
import BlockDetails from "./routes/block-details";
import Blocks from "./routes/blocks";
import ExtrinsicDetails from "./routes/extrinsic-details";
import Extrinsics from "./routes/extrinsics";
import Transfers from "./routes/transfers";
import Home from "./routes/home";
import store from "./store/store";
import Events from "./routes/events";
import TermsOfService from "./routes/tos";
import CookieConsentRow from "./components/CookieConcent";


function Main() {
  const { apiState, apiError, keyringState } = useSubstrateState();

  const loader = (text) => (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <p className="text-white">{text}</p>
    </div>
  );

  const message = (errObj) => (
    <div className="d-flex align-items-center flex-direction-column message-bar">
      <span className="header">Error Connecting to peaq network</span>
      <span className="">
        Connection to websocket {errObj.target.url} failed{" "}
      </span>
    </div>
  );

  if (apiState === "ERROR") return message(apiError);
  else if (apiState !== "READY") return loader("Connecting to peaq network");

  if (keyringState !== "READY") {
    return loader(
      "Loading accounts (please review any extension's authorization)"
    );
  }

  const contextRef = createRef();

  return (
    <div ref={contextRef}>
      <BrowserRouter>
        <TopNav />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/block" element={<Blocks />}></Route>
          <Route path="/block/:blockNumber" element={<BlockDetails />}></Route>
          <Route path="/extrinsic" element={<Extrinsics />}></Route>
          <Route
            path="/extrinsic/:extrinsicId"
            element={<ExtrinsicDetails />}
          ></Route>
          <Route path="/transfer" element={<Transfers />}></Route>
          <Route path="/event" element={<Events />}></Route>
          <Route path="/terms-of-service" element={<TermsOfService />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
        <br />
        <CookieConsentRow />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default function App() {
  return (
    <SubstrateContextProvider>
      <Provider store={store}>
        <Main />
      </Provider>
    </SubstrateContextProvider>
  );
}
