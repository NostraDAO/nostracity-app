import React from "react";
import UserLineIcon from "remixicon-react/UserLineIcon";
import styles from "./ProfileWallet.module.css";
import Button from "@material-ui/core/Button";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {useWeb3React} from '@web3-react/core'
import {InjectedConnector} from '@web3-react/injected-connector'
export default function ProfileWallet() {
  const router = useRouter();
const {active, account, activate} = useWeb3React();

const login = () =>{
  activate(new InjectedConnector({}))
}

const logout = () =>{
  console.log('logged')
}
  return (
    <div className={styles.profile}>
      <div className={styles.profileBox}>
        <UserLineIcon color="black" size="36px" />
        <p>{account?.substr(0,8)}...{account?.substr(-8,8)}</p>
        {active ? (<Button
          onClick={logout}
          variant="contained"
          color="primary"
        >
          Connected!
        </Button>) : (
          <Button
          onClick={login}
          variant="contained"
          color="primary"
        >
          Connect your wallet
        </Button>
        )}
      </div>
    </div>
  );
}
