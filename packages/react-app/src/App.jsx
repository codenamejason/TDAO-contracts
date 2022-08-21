import "antd/dist/antd.css";
import { useContractLoader } from "eth-hooks";
import { useExchangeEthPrice } from "eth-hooks/dapps/dex";
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ALCHEMY_KEY, NETWORKS } from "./constants";
import externalContracts from "./contracts/external_contracts";
import deployedContracts from "./contracts/hardhat_contracts.json";
import { useStaticJsonRPC } from "./hooks";

// Components
import { Navbar } from "./components";

// Views
import { useAccount, useSigner } from "wagmi";
import {
  AboutView,
  AdvancedSearchView,
  ArticleView,
  AuthorView,
  ContactView,
  GovernanceView,
  HomeView,
  PrivacyPolicyView,
  SearchView,
  SubgraphView,
  SubmitView,
  TermsOfServiceView,
  TokenView,
  UserView,
} from "./views";

const { ethers } = require("ethers");

/// 📡 What chain are your contracts deployed to?
const initialNetwork = NETWORKS.goerli; // <------- select your target frontend network (localhost, rinkeby, xdai, mainnet)

// 🛰 providers
const providers = [`https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_KEY}`, "https://rpc.scaffoldeth.io:48544"];

const App = ({ ...props }) => {
  const networkOptions = [initialNetwork.name, "mainnet", "goerli"];

  const { address } = useAccount();
  const { data: userSigner } = useSigner();

  const selectedNetwork = networkOptions[0];
  const targetNetwork = NETWORKS[selectedNetwork];

  // load all your providers
  const localProvider = useStaticJsonRPC([targetNetwork.rpcUrl]);
  const mainnetProvider = useStaticJsonRPC(providers);

  /* 💵 This hook will get the price of ETH from 🦄 Uniswap: */
  const price = useExchangeEthPrice(targetNetwork, mainnetProvider);

  // You can warn the user if you would like them to be on a specific network
  const localChainId = localProvider && localProvider._network && localProvider._network.chainId;
  const contractConfig = { deployedContracts: deployedContracts || {}, externalContracts: externalContracts || {} };
  // Load in your local 📝 contract and read a value from it:
  const readContracts = useContractLoader(localProvider, contractConfig);
  // If you want to make 🔐 write transactions to your contracts, use the userSigner:
  const writeContracts = useContractLoader(userSigner, contractConfig, localChainId);

  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleUserMenuOpen = state => {
    setUserMenuOpen(state);
  };

  return (
    <div className="App container-2xl mx-auto">
      <Navbar userMenuOpen={userMenuOpen} handleUserMenuOpen={handleUserMenuOpen} />
      <Routes>
        <Route index element={<HomeView address={address} />}></Route>
        <Route path="/browse"></Route>
        <Route path="/about" element={<AboutView />}></Route>
        <Route path="/contact" element={<ContactView />}></Route>
        <Route
          path="/author/:walletId"
          element={<AuthorView readContracts={readContracts} writeContracts={writeContracts} address={address} />}
        ></Route>
        <Route
          path="/article/:id"
          element={<ArticleView readContracts={readContracts} writeContracts={writeContracts} address={address} />}
        ></Route>
        <Route
          path="/search"
          element={<SearchView address={address} writeContracts={writeContracts} readContracts={readContracts} />}
        ></Route>
        <Route
          path="/advancedsearch"
          element={
            <AdvancedSearchView address={address} writeContracts={writeContracts} readContracts={readContracts} />
          }
        ></Route>
        <Route
          path="/user"
          element={<UserView address={address} userMenuOpen={userMenuOpen} handleUserMenuOpen={handleUserMenuOpen} />}
        >
          <Route
            path="/user/submissions"
            element={<UserView address={address} userMenuOpen={userMenuOpen} handleUserMenuOpen={handleUserMenuOpen} />}
          ></Route>
          <Route
            path="/user/author"
            element={<UserView address={address} userMenuOpen={userMenuOpen} handleUserMenuOpen={handleUserMenuOpen} />}
          ></Route>
          <Route
            path="/user/articles"
            element={<UserView address={address} userMenuOpen={userMenuOpen} handleUserMenuOpen={handleUserMenuOpen} />}
          ></Route>
          <Route
            path="/user/notifications"
            element={<UserView address={address} userMenuOpen={userMenuOpen} handleUserMenuOpen={handleUserMenuOpen} />}
          ></Route>
          <Route
            path="/user/publisher"
            element={<UserView address={address} userMenuOpen={userMenuOpen} handleUserMenuOpen={handleUserMenuOpen} />}
          ></Route>
        </Route>
        <Route path="/debug">
          {/* <Contract
            name="TalentDaoToken"
            price={price}
            signer={userSigner}
            provider={localProvider}
            address={address}
            blockExplorer={blockExplorer}
            contractConfig={contractConfig}
          />
          <Contract
            name="TalentDaoNftToken"
            price={price}
            signer={userSigner}
            provider={localProvider}
            address={address}
            blockExplorer={blockExplorer}
            contractConfig={contractConfig}
          />
          <Contract
            name="TalentDaoManager"
            price={price}
            signer={userSigner}
            provider={localProvider}
            address={address}
            blockExplorer={blockExplorer}
            contractConfig={contractConfig}
          /> */}
        </Route>
        <Route
          path="/submit/:walletId"
          element={<SubmitView address={address} writeContracts={writeContracts} readContracts={readContracts} />}
        ></Route>
        <Route path="/termsofservice" element={<TermsOfServiceView />}></Route>
        <Route path="/privacypolicy" element={<PrivacyPolicyView />}></Route>
        <Route path="/subgraph" element={<SubgraphView subgraphUri={props.subgraphUri} />}></Route>
        <Route path="/token" element={<TokenView />}></Route>
        <Route path="/governance" element={<GovernanceView />}></Route>
        <Route path="/request-feature"></Route>
      </Routes>
    </div>
  );
};

export default App;
