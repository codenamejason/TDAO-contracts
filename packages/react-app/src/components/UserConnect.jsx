import { useState } from "react";
import metamask from "../assets/metamask.png";
import party from "../assets/party.svg";
import wallet_connect from "../assets/wallet_connect.png";

const UserConnect = () => {
  const [toTypeWallet, setToTypeWallet] = useState(false);

  return (
    <div className="pt-4 flex flex-col">
      <div className="py-4 flex flex-row items-center">
        <img src={party}></img>
        <div className="text-6xl text-darkgray font-bold">Here we go</div>
      </div>
      <div className="rounded-2xl p-8 bg-white flex flex-col text-left space-y-4">
        {!toTypeWallet ? (
          <>
            <p className="font-bold">Connect Wallet</p>
            <div
              className="rounded-xl text-lg bg-primary text-white text-center cursor-pointer py-2"
              onClick={() => setToTypeWallet(true)}
            >
              Connect Wallet
            </div>
          </>
        ) : (
          <>
            <div
              className="rounded-xl bg-primary text-white text-center cursor-pointer py-4 flex flex-row items-center justify-center"
              onClick={() => setToTypeWallet(true)}
            >
              <div className="text-lg">Connect via Metamask</div>
              <img className="pl-2" src={metamask} alt="metamask"></img>
            </div>
            <div
              className="rounded-xl bg-primary text-white text-center cursor-pointer py-4 flex flex-row items-center justify-center"
              onClick={() => setToTypeWallet(true)}
            >
              <div className="text-lg">Connect via WalletConnect</div>
              <img className="pl-2" src={wallet_connect} alt="wallet-connect"></img>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserConnect;
