import "./App.css";
import AddChainKeplrWallet from "add-chain-keplr-wallet-component";
import { StargateClient } from "@cosmjs/stargate";
import { useState } from "react";
import { nillionTestnetChainInfo } from "./data/chain-info";

function App() {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState(null);
  const [isFetching, setIsFetching] = useState(false)

  const handleFetchBalance = async () => {
    if (!window.keplr) {
      alert("Please install keplr extension");
    } else {
      setIsFetching(true)
      const chainId = nillionTestnetChainInfo.chainId;
      await window.keplr.enable(chainId);

      const offlineSigner = window.keplr.getOfflineSigner(chainId);

      const accounts = await offlineSigner.getAccounts();
      const address = accounts[0].address;
      setAccount(address);

      const client = await StargateClient.connect(nillionTestnetChainInfo.rpc);
      const balance = await client.getBalance(
        address,
        nillionTestnetChainInfo.currencies[0].coinMinimalDenom
      );

      const decimal = nillionTestnetChainInfo.currencies[0].coinDecimals;

      setBalance(balance.amount/10**decimal);
      setIsFetching(false);
    }
  };

  return (
    <div className="app">
      <AddChainKeplrWallet
        text={"Add NilChain to Keplr"}
        chainInfo={nillionTestnetChainInfo}
      />
      <button onClick={handleFetchBalance} className="fetch-btn">
        Fetch balance
      </button>
      {isFetching && <span>Fetching balance...</span>}
      {!isFetching && account && balance !== null && (
        <span>
          Address {account} with balance: {balance} NIL
        </span>
      )}
    </div>
  );
}

export default App;
