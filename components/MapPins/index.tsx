import React, { useState, useEffect } from "react";
import styles from "./MapPins.module.css";
import PushPin2FillIcon from "remixicon-react/Pushpin2FillIcon";
import BankFillIcon from "remixicon-react/BankFillIcon";
import IconButton from "@material-ui/core/IconButton";
import { CustomModal } from "../CustomModal/CustomModal";
import { BankModal } from "../BankModal/BankModal";
import { makeStyles } from "@material-ui/core/styles";
import daiContractAbi from "../../abi/DAIE.json";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import AlertModal from '../AlertModal/AlertModal';

const useStyles = makeStyles((theme) => ({
  root: {
    "&.MuiIconButton-root	": {
      color: "#93100D",
    },
  },
}));

const barber_address = "";
const grocery_address = "";
const diner_address = "";

export default function MapPins() {
  const [isOpenBarber, setIsOpenBarber] = useState(false);
  const [isOpenGrocery, setIsOpenGrocery] = useState(false);
  const [isOpenDiner, setIsOpenDiner] = useState(false);
  const [isOpenBank, setIsOpenBank] = useState(false);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [hasMM, setHasMM] = useState(false);
  const [approved, setApproved] = useState(false);
  const [btnText, setBtnText] = useState("Approve");
  const classes = useStyles();
  const { account, active } = useWeb3React();
  let buttonText = "Approve";
  const dai_address = "0x7f5cBc0810dFA58bF13b14675909A022D959Bf62";

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMM(true);
    }
  }, []);

  const handleOpen = (item) => {
    if (item == "barber") {
      setIsOpenBarber(true);
    }
    if (item == "grocery") {
      setIsOpenGrocery(true);
    }
    if (item == "diner") {
      setIsOpenDiner(true);
    }
    if (item == "bank") {
      setIsOpenBank(true);
    }
  };

  const handleAlert = () => {
    setIsOpenAlert(false);
  }

  const handleClose = (item) => {
    if (item == "barber") {
      setIsOpenBarber(false);
    }
    if (item == "grocery") {
      setIsOpenGrocery(false);
    }
    if (item == "diner") {
      setIsOpenDiner(false);
    }
    if (item == "bank") {
      setIsOpenBank(false);
    }
  };
  async function Mint(item) {
    if (typeof window.ethereum !== "undefined") {
      console.log('active', active)
      const web3 = new Web3(Web3.givenProvider);
      const daiContract = new web3.eth.Contract(daiContractAbi, dai_address);
      let approveTx;
      let allowanceTx;
      let nftContract =
        item == "barber"
          ? barber_address
          : item == "grocery"
          ? grocery_address
          : item == "diner"
          ? diner_address
          : "";
      if (!approved) {
        try {
          allowanceTx = await daiContract.methods
            .allowance(account, dai_address)
            .call();
          if (allowanceTx <= 0) {
            approveTx = await daiContract.methods
              .approve(account, 99999999) // TODO: add nftContract, ask Sam about the value
              .send({ from: account });
            setApproved(true);
            setBtnText("Mint");
          }
          if (allowanceTx >= 0) {
            setBtnText("Mint");
          }
        } catch (err) {
          console.log(err);
          setApproved(false);
        } finally {
          if (approveTx) {
            setApproved(true);
          }
        }
      }
      if(approved){
        try {
          let mintTx = await daiContract.methods
            .mint(nftContract, 1)
            .send({ to: account });
          console.log(mintTx);
        } catch (err) {
          console.log(err);
        }
      }
      if(!active){
        <AlertModal isOpen={()=> setOpenAlert(true)} handleClose={ handleClose}>
          You need to be connected to the MetaMask
          </AlertModal>
      }
    }
  }

  return (
    <>
      <CustomModal
        isOpen={isOpenBarber}
        handleClose={() => handleClose("barber")}
        title="Mint for the Barbershop"
        handleMint={() => Mint("barber")}
        buttonText={btnText}
        nftName="Barber"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam,
        cupiditate.
      </CustomModal>

      <CustomModal
        isOpen={isOpenGrocery}
        handleClose={() => handleClose("grocery")}
        title="Mint for the Grocery Store"
        handleMint={() => Mint("grocery")}
        buttonText={btnText}
        nftName="Tomatoes"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam,
        cupiditate.
      </CustomModal>

      <BankModal
        isOpen={isOpenBank}
        handleClose={() => handleClose("bank")}
        title="Bank"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam,
        cupiditate.
      </BankModal>

      <CustomModal
        isOpen={isOpenDiner}
        handleClose={() => handleClose("diner")}
        title="Mint for the Diner"
        handleMint={() => Mint("diner")}
        buttonText={btnText}
        nftName="Coffee"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam,
        cupiditate.
      </CustomModal>

      <div className={styles.mapPins}>
        <IconButton
          className={classes.root}
          onClick={() => handleOpen("barber")}
          color="primary"
          name="barber"
        >
          <PushPin2FillIcon size="36px" />
        </IconButton>

        <IconButton
          className={classes.root}
          onClick={() => handleOpen("grocery")}
          color="primary"
          name="grocery"
        >
          <PushPin2FillIcon size="36px" />
        </IconButton>

        <IconButton
          className={classes.root}
          onClick={() => handleOpen("diner")}
          color="primary"
          name="diner"
        >
          <PushPin2FillIcon size="36px" />
        </IconButton>

        <IconButton
          className={classes.root}
          onClick={() => handleOpen("bank")}
          color="primary"
          name="bank"
        >
          <BankFillIcon size="36px" />
        </IconButton>
      </div>
    </>
  );
}
