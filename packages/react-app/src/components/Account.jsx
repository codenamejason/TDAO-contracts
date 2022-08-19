import React from "react";
import { useThemeSwitcher } from "react-css-theme-switcher";
import { Address, Balance } from "../components";

/*
  ~ What it does? ~

  Displays an Address, Balance, and Wallet as one Account component,
  also allows users to log in to existing accounts and log out

  ~ How can I use? ~

  <Account
    useBurner={boolean}
    address={address}
    localProvider={localProvider}
    userProvider={userProvider}
    mainnetProvider={mainnetProvider}
    price={price}
    web3Modal={web3Modal}
    loadWeb3Modal={loadWeb3Modal}
    logoutOfWeb3Modal={logoutOfWeb3Modal}
    blockExplorer={blockExplorer}
    isContract={boolean}
  />

  ~ Features ~

  - Provide address={address} and get balance corresponding to the given address
  - Provide localProvider={localProvider} to access balance on local network
  - Provide userProvider={userProvider} to display a wallet
  - Provide mainnetProvider={mainnetProvider} and your address will be replaced by ENS name
              (ex. "0xa870" => "user.eth")
  - Provide price={price} of ether and get your balance converted to dollars
  - Provide web3Modal={web3Modal}, loadWeb3Modal={loadWeb3Modal}, logoutOfWeb3Modal={logoutOfWeb3Modal}
              to be able to log in/log out to/from existing accounts
  - Provide blockExplorer={blockExplorer}, click on address and get the link
              (ex. by default "https://etherscan.io/" or for xdai "https://blockscout.com/poa/xdai/")
*/

export default function Account({
  useBurner,
  address,
  userSigner,
  localProvider,
  mainnetProvider,
  price,
  minimized,
  web3Modal,
  loadWeb3Modal,
  logoutOfWeb3Modal,
  blockExplorer,
  isContract,
}) {
  const { currentTheme } = useThemeSwitcher();

  const modalButtons = [];
  if (web3Modal) {
    if (web3Modal.cachedProvider) {
      modalButtons.push(
        <div
          className="flex bg-primary text-white hover:bg-red-600 px-8 py-3 rounded-3xl shadow-lg uppercase tracking-wider font-semibold text-sm"
          key="logoutbutton"
          style={{ color: "white" }}
          onClick={logoutOfWeb3Modal}
        >
          Logout
        </div>,
      );
    } else {
      modalButtons.push(
        <div
          className="flex bg-primary text-white hover:bg-red-600 px-8 py-3 rounded-3xl shadow-lg uppercase tracking-wider font-semibold text-sm"
          key="loginbutton"
          style={{ color: "white", cursor: "pointer" }}
          onClick={loadWeb3Modal}
        >
          Connect
        </div>,
      );
    }
  }
  const display = minimized ? (
    ""
  ) : (
    <div className="">
      {web3Modal && web3Modal.cachedProvider ? (
        <div className="">
          {address && <Address address={address} ensProvider={mainnetProvider} blockExplorer={blockExplorer} />}
          {/*<Suspense fallback={<div>Loading...</div>}><Balance address={address} provider={localProvider} price={price} /></Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <Wallet
              address={address}
              provider={localProvider}
              signer={userSigner}
              ensProvider={mainnetProvider}
              price={price}
              color={currentTheme === "light" ? "#1890ff" : "#2caad9"}
            /> 
          </Suspense> */}
        </div>
      ) : useBurner ? (
        ""
      ) : isContract ? (
        <>
          {address && <Address address={address} ensProvider={mainnetProvider} blockExplorer={blockExplorer} />}
          <Balance address={address} provider={localProvider} price={price} />
        </>
      ) : (
        ""
      )}
      {useBurner && web3Modal && !web3Modal.cachedProvider ? (
        <>
          <Address address={address} ensProvider={mainnetProvider} blockExplorer={blockExplorer} />
          {/*<Suspense fallback={<div>Loading...</div>}><Balance address={address} provider={localProvider} price={price} /></Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <Wallet
              address={address}
              provider={localProvider}
              signer={userSigner}
              ensProvider={mainnetProvider}
              price={price}
              color={currentTheme === "light" ? "#1890ff" : "#2caad9"}
            /> 
          </Suspense> */}
        </>
      ) : (
        <></>
      )}
    </div>
  );

  return (
    <div>
      {display}
      {modalButtons}
    </div>
  );
}
