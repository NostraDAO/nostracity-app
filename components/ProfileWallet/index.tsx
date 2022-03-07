import React from "react";
import UserLineIcon from "remixicon-react/UserLineIcon";
import styles from "./ProfileWallet.module.css";
import Button from "@material-ui/core/Button";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Moralis from "moralis";
import { useMoralis } from "react-moralis";

export default function ProfileWallet() {
  const { isAuthenticated, logout, authenticate, isAuthenticating, user, account } = useMoralis();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      console.log("logged in user:", user);
      console.log(user?.get("ethAddress"));
    }
  }, [isAuthenticated]);

  const login = async () => {
    if (!isAuthenticated) {

      await authenticate({signingMessage: "Log in authorization to NostraCity" })
        .then(function (user) {
          console.log("logged in user:", user.attributes.accounts );
          console.log(user.get("ethAddress"));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  const logOut = async () => {
    await logout();
    console.log("logged out");
  }


  return (
    <div className={styles.profile}>
      <div className={styles.profileBox}>
        <UserLineIcon color="black" size="36px" />
        {isAuthenticated ? (<Button
          onClick={login}
          variant="contained"
          color="primary"
        >
          Connected!
        </Button>) : (
          <Button
          onClick={logout}
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
