import React from "react";
import UserLineIcon from "remixicon-react/UserLineIcon";
import styles from "./ProfileWallet.module.css";
import Button from "@material-ui/core/Button";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import {
  InjectedConnector,
  networkChanged,
} from "@web3-react/injected-connector";
import { AlertModal } from "../AlertModal/AlertModal";
import Web3 from "web3";

const web3 = new Web3(Web3.givenProvider);

import NftsOwnedModal from "../NftsOwnedModal";

export default function ProfileWallet() {
  const router = useRouter();
  const { active, account, activate, deactivate } = useWeb3React();
  const [nftOpen, setNftOpen] = useState(false);
  const [wrongNetworkAlert, setWrongNetworkAlert] = useState(false);
  const [networkMessage, setNetworkMessage] = useState("");
  const [network, setNetwork] = useState();

  
  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setNetworkMessage(
        "Unsupported chain. Please connect to Avalanche MainNet"
      );
      window.ethereum.on("networkChanged", function (networkId) {
        setNetwork(networkId);
        if (network != 43113) {
          setWrongNetworkAlert(true);
          deactivate(new InjectedConnector({}));
        } 
        
      });
    }
  });

  const login = () => {
    if (network == 43113) {
      activate(new InjectedConnector({}));
    } else {
      setWrongNetworkAlert(true);
    }
  };

  const logout = () => {
    deactivate(new InjectedConnector({}));
  };

  const handleNftOpen = () => {
    nftOpen == false ? setNftOpen(true) : setNftOpen(false);
  };

  const handleClose = () => {
    wrongNetworkAlert == false ? setWrongNetworkAlert(true) : setWrongNetworkAlert(false);
  };
  return (
    <>
      <div className={styles.profile}>
        <div className={styles.profileBox}>
          <UserLineIcon color="black" size="36px" />
          <span>
            {account?.substr(0, 8)}...{account?.substr(-8, 8)}
          </span>
          {active ? (
            <Button onClick={logout} variant="contained" color="primary">
              Connected!
            </Button>
          ) : (
            <Button onClick={login} variant="contained" color="primary">
              Connect your wallet
            </Button>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleNftOpen()}
          >
            My NFTs
          </Button>
        </div>
      </div>
      <NftsOwnedModal isOpen={nftOpen} handleClose={() => handleNftOpen()} />
      <AlertModal isOpen={wrongNetworkAlert} handleClose={() => handleClose()}>
        {networkMessage}
      </AlertModal>
    </>
  );
}
