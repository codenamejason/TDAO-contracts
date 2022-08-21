import { ApolloProvider } from "@apollo/client";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/dist/index.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { WagmiConfig } from "wagmi";
import App from "./App";
import { ErrorBoundary } from "./components";
import "./index.css";
import { arweaveClient } from "./utils/graphqlClient";
import client, { chains } from "./utils/wagmi";

ReactDOM.render(
  <ErrorBoundary>
    <ApolloProvider client={arweaveClient}>
      <WagmiConfig client={client}>
        <RainbowKitProvider chains={chains}>
          <Router>
            <App />
          </Router>
        </RainbowKitProvider>
      </WagmiConfig>
    </ApolloProvider>
  </ErrorBoundary>,
  document.getElementById("root"),
);
