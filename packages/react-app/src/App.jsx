import { Col, Row } from "antd";
import "antd/dist/antd.css";
import { useBalance, useContractLoader, useGasPrice, useOnBlock, useUserProviderAndSigner } from "eth-hooks";
import { useExchangeEthPrice } from "eth-hooks/dapps/dex";
import React, { useCallback, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { ALCHEMY_KEY, NETWORKS } from "./constants";
import externalContracts from "./contracts/external_contracts";
import deployedContracts from "./contracts/hardhat_contracts.json";
import { Transactor, Web3ModalSetup } from "./helpers";
import { useStaticJsonRPC } from "./hooks";

// Components
import { Faucet, NetworkDisplay } from "./components";
import { Navbar } from "./components/HelperComponents";

// Views
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

// 😬 Sorry for all the console logging
const DEBUG = true;
const NETWORKCHECK = true;
const USE_BURNER_WALLET = false; // toggle burner wallet feature
const USE_NETWORK_SELECTOR = false;

const web3Modal = Web3ModalSetup();

// 🛰 providers
const providers = [`https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_KEY}`, "https://rpc.scaffoldeth.io:48544"];

const App = props => {
  // specify all the chains your app is available on. Eg: ['localhost', 'mainnet', ...otherNetworks ]
  // reference './constants.js' for other networks
  const networkOptions = [initialNetwork.name, "mainnet", "goerli"];

  const [injectedProvider, setInjectedProvider] = useState();
  const [address, setAddress] = useState();
  const [selectedNetwork, setSelectedNetwork] = useState(networkOptions[0]);
  const targetNetwork = NETWORKS[selectedNetwork];

  // 🔭 block explorer URL
  const blockExplorer = targetNetwork.blockExplorer;

  // load all your providers
  const localProvider = useStaticJsonRPC([targetNetwork.rpcUrl]);
  const mainnetProvider = useStaticJsonRPC(providers);

  if (DEBUG) console.log(`Using ${selectedNetwork} network`);

  // 🛰 providers
  // if (DEBUG) console.log("📡 Connecting to Mainnet Ethereum");

  const logoutOfWeb3Modal = async () => {
    await web3Modal.clearCachedProvider();
    if (injectedProvider && injectedProvider.provider && typeof injectedProvider.provider.disconnect == "function") {
      await injectedProvider.provider.disconnect();
    }
    setTimeout(() => {
      window.location.reload();
    }, 1);
  };

  /* 💵 This hook will get the price of ETH from 🦄 Uniswap: */
  const price = useExchangeEthPrice(targetNetwork, mainnetProvider);

  /* 🔥 This hook will get the price of Gas from ⛽️ EtherGasStation */
  const gasPrice = useGasPrice(targetNetwork, "fast");

  // Use your injected provider from 🦊 Metamask or if you don't have it then instantly generate a 🔥 burner wallet.
  const userProviderAndSigner = useUserProviderAndSigner(injectedProvider, localProvider, USE_BURNER_WALLET);
  const userSigner = userProviderAndSigner.signer;

  useEffect(() => {
    async function getAddress() {
      if (userSigner) {
        const newAddress = await userSigner.getAddress();
        setAddress(newAddress);
      }
    }
    getAddress();
  }, [userSigner]);

  // You can warn the user if you would like them to be on a specific network
  const localChainId = localProvider && localProvider._network && localProvider._network.chainId;
  const selectedChainId =
    userSigner && userSigner.provider && userSigner.provider._network && userSigner.provider._network.chainId;

  // The transactor wraps transactions and provides notificiations
  const tx = Transactor(userSigner, gasPrice);
  const contractConfig = { deployedContracts: deployedContracts || {}, externalContracts: externalContracts || {} };
  // Load in your local 📝 contract and read a value from it:
  const readContracts = useContractLoader(localProvider, contractConfig);
  // If you want to make 🔐 write transactions to your contracts, use the userSigner:
  const writeContracts = useContractLoader(userSigner, contractConfig, localChainId);

  const loadWeb3Modal = useCallback(async () => {
    const provider = await web3Modal.connect();
    setInjectedProvider(new ethers.providers.Web3Provider(provider));

    provider.on("chainChanged", chainId => {
      console.log(`chain changed to ${chainId}! updating providers`);
      setInjectedProvider(new ethers.providers.Web3Provider(provider));
    });

    provider.on("accountsChanged", () => {
      console.log(`account changed!`);
      setInjectedProvider(new ethers.providers.Web3Provider(provider));
    });

    // Subscribe to session disconnection
    provider.on("disconnect", (code, reason) => {
      console.log(code, reason);
      logoutOfWeb3Modal();
    });
    // eslint-disable-next-line
  }, [setInjectedProvider]);

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      loadWeb3Modal();
    }
  }, [loadWeb3Modal]);

  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleUserMenuOpen = state => {
    setUserMenuOpen(state);
  };

  const faucetAvailable = localProvider && localProvider.connection && targetNetwork.name.indexOf("local") !== -1;

  return (
    <div className="App container-2xl mx-auto">
      <NetworkDisplay
        NETWORKCHECK={NETWORKCHECK}
        localChainId={localChainId}
        selectedChainId={selectedChainId}
        targetNetwork={targetNetwork}
        logoutOfWeb3Modal={logoutOfWeb3Modal}
        USE_NETWORK_SELECTOR={USE_NETWORK_SELECTOR}
      />
      <Navbar
        useBurner={false}
        address={address}
        localProvider={localProvider}
        userSigner={userSigner}
        mainnetProvider={mainnetProvider}
        price={price}
        web3Modal={web3Modal}
        loadWeb3Modal={loadWeb3Modal}
        logoutOfWeb3Modal={logoutOfWeb3Modal}
        blockExplorer={blockExplorer}
        userMenuOpen={userMenuOpen}
        handleUserMenuOpen={handleUserMenuOpen}
      />
      <Routes>
        <Route index element={<HomeView address={address} />}></Route>
        <Route path="/browse"></Route>
        <Route path="/about" element={<AboutView />}></Route>
        <Route path="/contact" element={<ContactView />}></Route>
        <Route
          path="/author/:walletId"
          element={
            <AuthorView tx={tx} readContracts={readContracts} writeContracts={writeContracts} address={address} />
          }
        ></Route>
        <Route
          path="/article/:id"
          element={
            <ArticleView readContracts={readContracts} writeContracts={writeContracts} address={address} tx={tx} />
          }
        ></Route>
        <Route
          path="/search"
          element={
            <SearchView address={address} tx={tx} writeContracts={writeContracts} readContracts={readContracts} />
          }
        ></Route>
        <Route
          path="/advancedsearch"
          element={
            <AdvancedSearchView
              address={address}
              tx={tx}
              writeContracts={writeContracts}
              readContracts={readContracts}
            />
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
          element={
            <SubmitView address={address} tx={tx} writeContracts={writeContracts} readContracts={readContracts} />
          }
        ></Route>
        <Route path="/termsofservice" element={<TermsOfServiceView />}></Route>
        <Route path="/privacypolicy" element={<PrivacyPolicyView />}></Route>
        <Route
          path="/subgraph"
          element={
            <SubgraphView
              subgraphUri={props.subgraphUri}
              tx={tx}
              writeContracts={writeContracts}
              mainnetProvider={mainnetProvider}
            />
          }
        ></Route>
        <Route path="/token" element={<TokenView />}></Route>
        <Route path="/governance" element={<GovernanceView />}></Route>
        <Route path="/request-feature"></Route>
      </Routes>

      <Row align="middle" gutter={[4, 4]}>
        <Col span={24}>
          {
            // if the local provider has a signer, let's show the faucet:
            true ? <Faucet localProvider={localProvider} price={price} ensProvider={mainnetProvider} /> : ""
          }
        </Col>
      </Row>
    </div>
  );
};

export default App;
