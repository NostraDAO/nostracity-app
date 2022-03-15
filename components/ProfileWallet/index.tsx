import React from "react";
import UserLineIcon from "remixicon-react/UserLineIcon";
import styles from "./ProfileWallet.module.css";
import Button from "@material-ui/core/Button";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { AlertModal } from "../AlertModal/AlertModal";
import Web3 from "web3";

const web3 = new Web3(Web3.givenProvider);
declare var window: any;

import NftsOwnedModal from "../NftsOwnedModal";

export default function ProfileWallet() {
  const router = useRouter();
  const { active, account, activate, deactivate, chainId } = useWeb3React();
  const [nftOpen, setNftOpen] = useState(false);
  const [wrongNetworkAlert, setWrongNetworkAlert] = useState(false);
  const [networkMessage, setNetworkMessage] = useState("");
  const [connected, setConnected] = useState(false)
  const [connectedMessage, setConnectedMessage] = useState('');


  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setNetworkMessage(
        "Unsupported chain. Please connect to Avalanche MainNet"
      );

      if (chainId == 43113 && chainId != 'undefined') {
        setConnected(true);
        console.log("here");
      } if(chainId != 43113 && chainId != 'undefined') {
        console.log(chainId);
        setWrongNetworkAlert(true);
        deactivate();
      }
    }
  }, [chainId]);

  const login = () => {
    if (window.ethereum !== undefined) {
      setConnectedMessage('You connected sucessfully')
      activate(new InjectedConnector({}));
     
    }
   
  };

  const logout = () => {
    deactivate();

  };

  const handleNftOpen = () => {
    nftOpen == false ? setNftOpen(true) : setNftOpen(false);
  };

  const handleClose = () => {
    wrongNetworkAlert == false
      ? setWrongNetworkAlert(true)
      : setWrongNetworkAlert(false);
  };

  const handleCloseConnected = () => {
   connected == false
      ? setConnected(true)
      : setConnected(false);
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
      <AlertModal isOpen={connected} handleClose={() => handleCloseConnected()}>
        {connectedMessage}
      </AlertModal>
    </>
  );
}
