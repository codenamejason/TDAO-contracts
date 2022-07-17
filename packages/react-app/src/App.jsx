import { Col, Row } from "antd";
import "antd/dist/antd.css";
import { useBalance, useContractLoader, useGasPrice, useOnBlock, useUserProviderAndSigner } from "eth-hooks";
import { useExchangeEthPrice } from "eth-hooks/dapps/dex";
import React, { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/HelperComponents/Navbar";
import { ALCHEMY_KEY, NETWORKS } from "./constants";
import externalContracts from "./contracts/external_contracts";
// contracts
import ErrorBoundary from "./components/ErrorBoundary";
import deployedContracts from "./contracts/hardhat_contracts.json";
import { Transactor, Web3ModalSetup } from "./helpers";
import { useStaticJsonRPC } from "./hooks";

// todo: lazy load components
const NetworkDisplay = lazy(() => import("./components/NetworkDisplay"));
const Contract = lazy(() => import("./components/Contract"));
const Faucet = lazy(() => import("./components/Faucet"));

// todo: lazy load views
const AboutView = lazy(() => import("./views/About"));
const AdvancedSearchView = lazy(() => import("./views/AdvancedSearch"));
const ArticleView = lazy(() => import("./views/Article"));
const AuthorView = lazy(() => import("./views/Author"));
const ContactView = lazy(() => import("./views/Contact"));
const HomeView = lazy(() => import("./views/Home"));
const PrivacyPolicyView = lazy(() => import("./views/PrivacyPolicy"));
const SearchView = lazy(() => import("./views/Search"));
const SubgraphView = lazy(() => import("./views/Subgraph"));
const SubmitView = lazy(() => import("./views/Submit"));
const TermsOfServiceView = lazy(() => import("./views/TermsOfService"));
const UserView = lazy(() => import("./views/User"));
const TokenView = lazy(() => import("./views/Token"));
const Governance = lazy(() => import("./views/Governance"));

const { ethers } = require("ethers");

/// 📡 What chain are your contracts deployed to?
const initialNetwork = NETWORKS.localhost; // <------- select your target frontend network (localhost, rinkeby, xdai, mainnet)

// 😬 Sorry for all the console logging
const DEBUG = true;
const NETWORKCHECK = true;
const USE_BURNER_WALLET = true; // toggle burner wallet feature
const USE_NETWORK_SELECTOR = false;

const web3Modal = Web3ModalSetup();

// 🛰 providers
const providers = [`https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_KEY}`, "https://rpc.scaffoldeth.io:48544"];

function App(props) {
  // specify all the chains your app is available on. Eg: ['localhost', 'mainnet', ...otherNetworks ]
  // reference './constants.js' for other networks
  const networkOptions = [initialNetwork.name, "mainnet", "rinkeby"];

  const [injectedProvider, setInjectedProvider] = useState();
  const [address, setAddress] = useState();
  const [selectedNetwork, setSelectedNetwork] = useState(networkOptions[0]);
  const location = useLocation();

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

  // For more hooks, check out 🔗eth-hooks at: https://www.npmjs.com/package/eth-hooks

  // The transactor wraps transactions and provides notificiations
  const tx = Transactor(userSigner, gasPrice);

  // 🏗 scaffold-eth is full of handy hooks like this one to get your balance:
  const yourLocalBalance = useBalance(localProvider, address);

  // Just plug in different 🛰 providers to get your balance on different chains:
  const yourMainnetBalance = useBalance(mainnetProvider, address);

  // const contractConfig = useContractConfig();

  const contractConfig = { deployedContracts: deployedContracts || {}, externalContracts: externalContracts || {} };

  // Load in your local 📝 contract and read a value from it:
  const readContracts = useContractLoader(localProvider, contractConfig);

  // If you want to make 🔐 write transactions to your contracts, use the userSigner:
  const writeContracts = useContractLoader(userSigner, contractConfig, localChainId);

  // EXTERNAL CONTRACT EXAMPLE:
  //
  // If you want to bring in the mainnet DAI contract it would look like:
  const mainnetContracts = useContractLoader(mainnetProvider, contractConfig);

  // If you want to call a function on a new block
  useOnBlock(mainnetProvider, () => {
    console.log(`⛓ A new mainnet block is here: ${mainnetProvider._lastBlockNumber}`);
  });

  // 🧫 DEBUG 👨🏻‍🔬
  // useEffect(() => {
  //   if (
  //     DEBUG &&
  //     mainnetProvider &&
  //     address &&
  //     selectedChainId &&
  //     yourLocalBalance &&
  //     yourMainnetBalance &&
  //     readContracts &&
  //     writeContracts &&
  //     mainnetContracts
  //   ) {
  //     console.log("_____________________________________ 🏗 scaffold-eth _____________________________________");
  //     console.log("🌎 mainnetProvider", mainnetProvider);
  //     console.log("🏠 localChainId", localChainId);
  //     console.log("👩‍💼 selected address:", address);
  //     console.log("🕵🏻‍♂️ selectedChainId:", selectedChainId);
  //     console.log("💵 yourLocalBalance", yourLocalBalance ? ethers.utils.formatEther(yourLocalBalance) : "...");
  //     console.log("💵 yourMainnetBalance", yourMainnetBalance ? ethers.utils.formatEther(yourMainnetBalance) : "...");
  //     console.log("📝 readContracts", readContracts);
  //     console.log("🌍 DAI contract on mainnet:", mainnetContracts);
  //     console.log("🔐 writeContracts", writeContracts);
  //   }
  // }, [
  //   mainnetProvider,
  //   address,
  //   selectedChainId,
  //   yourLocalBalance,
  //   yourMainnetBalance,
  //   readContracts,
  //   writeContracts,
  //   mainnetContracts,
  //   localChainId,
  // ]);

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
      <Suspense fallback={<div>Loading...</div>}>
        <NetworkDisplay
          NETWORKCHECK={NETWORKCHECK}
          localChainId={localChainId}
          selectedChainId={selectedChainId}
          targetNetwork={targetNetwork}
          logoutOfWeb3Modal={logoutOfWeb3Modal}
          USE_NETWORK_SELECTOR={USE_NETWORK_SELECTOR}
        />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
      <Switch>
        <Route exact path="/">
          <ErrorBoundary>
            <Suspense fallback={<div>Loading...</div>}>
              <HomeView yourLocalBalance={yourLocalBalance} readContracts={readContracts} address={address} />
            </Suspense>
          </ErrorBoundary>
        </Route>
        <Route exact path="/browse"></Route>
        <Route exact path="/about">
          <Suspense fallback={<div>Loading...</div>}>
            <AboutView />
          </Suspense>
        </Route>
        <Route exact path="/contact">
          <Suspense fallback={<div>Loading...</div>}>
            <ContactView />
          </Suspense>
        </Route>
        <Route exact path="/author/:walletId">
          <Suspense fallback={<div>Loading...</div>}>
            <AuthorView tx={tx} readContracts={readContracts} writeContracts={writeContracts} address={address} />
          </Suspense>
        </Route>
        <Route exact path="/article/:id">
          <Suspense fallback={<div>Loading...</div>}>
            <ArticleView readContracts={readContracts} writeContracts={writeContracts} address={address} tx={tx} />
          </Suspense>
        </Route>
        <Route exact path="/search">
          <Suspense fallback={<div>Loading...</div>}>
            <SearchView address={address} tx={tx} writeContracts={writeContracts} readContracts={readContracts} />
          </Suspense>
        </Route>
        <Route exact path="/advancedsearch">
          <Suspense fallback={<div>Loading...</div>}>
            <AdvancedSearchView
              address={address}
              tx={tx}
              writeContracts={writeContracts}
              readContracts={readContracts}
            />
          </Suspense>
        </Route>
        <Route exact path={["/user", "/user/submissions", "/user/author", "/user/articles", "/user/notifications", "/user/published", "/user/reviewed_papers"]}>
          <Suspense fallback={<div>Loading...</div>}>
            <UserView address={address} userMenuOpen={userMenuOpen} handleUserMenuOpen={handleUserMenuOpen} />
          </Suspense>
        </Route>
        <Route exact path="/debug">
          <Suspense fallback={<div>Loading...</div>}>
            <Contract
              name="TalentDaoToken"
              price={price}
              signer={userSigner}
              provider={localProvider}
              address={address}
              blockExplorer={blockExplorer}
              contractConfig={contractConfig}
            />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <Contract
              name="TalentDaoNftToken"
              price={price}
              signer={userSigner}
              provider={localProvider}
              address={address}
              blockExplorer={blockExplorer}
              contractConfig={contractConfig}
            />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <Contract
              name="TalentDaoManager"
              price={price}
              signer={userSigner}
              provider={localProvider}
              address={address}
              blockExplorer={blockExplorer}
              contractConfig={contractConfig}
            />
          </Suspense>
        </Route>
        <Route exact path="/submit/:walletId">
          <Suspense fallback={<div>Loading...</div>}>
            <SubmitView address={address} tx={tx} writeContracts={writeContracts} readContracts={readContracts} />
          </Suspense>
        </Route>
        <Route exact path="/termsofservice">
          <Suspense fallback={<div>Loading...</div>}>
            <TermsOfServiceView />
          </Suspense>
        </Route>
        <Route exact path="/privacypolicy">
          <Suspense fallback={<div>Loading...</div>}>
            <PrivacyPolicyView />
          </Suspense>
        </Route>
        <Route path="/subgraph">
          <Suspense fallback={<div>Loading...</div>}>
            <SubgraphView
              subgraphUri={props.subgraphUri}
              tx={tx}
              writeContracts={writeContracts}
              mainnetProvider={mainnetProvider}
            />
          </Suspense>
        </Route>
        <Route path="/token">
          <Suspense fallback={<div>Loading...</div>}>
            <TokenView />
          </Suspense>
        </Route>
        <Route path="/governance">
          <Suspense fallback={<div>Loading...</div>}>
            <Governance />
          </Suspense>
        </Route>
        <Route path="/request-feature">
          <Suspense fallback={<div>Loading...</div>}>
            <div>Request Feature</div>
          </Suspense>
        </Route>
      </Switch>

      <Row align="middle" gutter={[4, 4]}>
        <Col span={24}>
          {
            // if the local provider has a signer, let's show the faucet:
            true ? (
              <Suspense fallback={<div>Loading...</div>}>
                <Faucet localProvider={localProvider} price={price} ensProvider={mainnetProvider} />
              </Suspense>
            ) : (
              ""
            )
          }
        </Col>
      </Row>
    </div>
  );
}

export default App;
