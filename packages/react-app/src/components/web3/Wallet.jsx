import React from "react";
import { useAccount } from "wagmi";

const Wallet = () => {
  const { address } = useAccount();
  return <div>Wallet Address: {address}</div>;
};

export default Wallet;
