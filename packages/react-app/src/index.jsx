import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { WagmiConfig } from "wagmi";
import App from "./App";
import { ErrorBoundary } from "./components";
import "./index.css";
import client from "./utils/wagmi";

const themes = {
  dark: "./dark-theme.css",
  light: "./light-theme.css",
};

const prevTheme = window.localStorage.getItem("theme");

const subgraphUri = "https://arweave.net/graphql";

const apolloClient = new ApolloClient({
  uri: subgraphUri,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ErrorBoundary>
    <ApolloProvider client={apolloClient}>
      <ThemeSwitcherProvider themeMap={themes} defaultTheme={prevTheme || "light"}>
        <WagmiConfig client={client}>
          <Router>
            <App subgraphUri={subgraphUri} />
          </Router>
        </WagmiConfig>
      </ThemeSwitcherProvider>
    </ApolloProvider>
  </ErrorBoundary>,
  document.getElementById("root"),
);
