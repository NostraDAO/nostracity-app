import React from "react";
import styles from "./ProfileWallet.module.css";
import Button from "@material-ui/core/Button";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { InjectedConnector } from "@web3-react/injected-connector";
import { AlertModal } from "../AlertModal/AlertModal";
import {useConnectContext} from "../../context/ConnectContext"
import PersonIcon from '@mui/icons-material/Person';
declare let window: any;

import NftsOwnedModal from "../NftsOwnedModal";

export default function ProfileWallet() {
  const router = useRouter();
  const [nftOpen, setNftOpen] = useState(false);
  const [wrongNetworkAlert, setWrongNetworkAlert] = useState(false);
  const [networkMessage, setNetworkMessage] = useState("");
  const [connected, setConnected] = useState(false);
  const [connectedMessage, setConnectedMessage] = useState("");
  const {chain, account, active, activate, deactivate } = useConnectContext();

  async function getChainId() {
    if(chain !== 43114 && process.env.NODE_ENV == 'production'){
      setNetworkMessage(
        "Unsupported chain. Please connect to Avalanche MainNet."
      );
    }
    if(chain == 43114 && process.env.NODE_ENV == 'development'){
      setNetworkMessage(
        "You are on the test ambient. Unsupported chain. Please connect to Avalanche FujinNet."
      );
    }
  }
  
  useEffect(() => {
    if(window.ethereum !== "undefined"){
    window.ethereum.on('chainChanged', (chain) => {
      if(process.env.NODE_ENV == 'production'){
        chain !== 43114 ? deactivate() : null;
      }
      if(process.env.NODE_ENV == 'development'){
        chain !== 43113 ? deactivate() : null;
      }
    });
    }
    getChainId();
  }, [chain])

  const login = () => {
        if (chain == 43114 && process.env.NODE_ENV == 'production') {
          setConnectedMessage("You connected sucessfully");
          activate(new InjectedConnector({}));
          setConnected(true);        
          setWrongNetworkAlert(false);
        }
      if (chain != 43114 && process.env.NODE_ENV == 'production') {
        setWrongNetworkAlert(true);
        deactivate();
      }

      if(chain == 43113 && process.env.NODE_ENV == 'development') {
        setConnectedMessage("You connected sucessfully to the Test Environment");
        activate(new InjectedConnector({}));
        setConnected(true);        
        setWrongNetworkAlert(false);
      }
      if (chain != 43113 && process.env.NODE_ENV == 'development') {
        setWrongNetworkAlert(true);
        deactivate();
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
    connected == false ? setConnected(true) : setConnected(false);
  };
  return (
    <>
      <div className={styles.profile}>
        <div className={styles.profileBox}>
          <PersonIcon  sx={{color: "white"}} fontSize="large" />
          <span style={{ color: "white" }}>
            {typeof account === "string" ? account?.substring(0, 8) : null} ...{typeof account === "string" ? account?.substring(-8, 8) : null}
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
