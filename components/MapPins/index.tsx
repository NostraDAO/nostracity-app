import React, { useState, useEffect } from "react";
import styles from "./MapPins.module.css";
import PushPin2FillIcon from "remixicon-react/Pushpin2FillIcon";
import BankFillIcon from "remixicon-react/BankFillIcon";
import IconButton from "@material-ui/core/IconButton";
import { CustomModal } from "../CustomModal/CustomModal";
import { BankModal } from "../BankModal/BankModal";
import { makeStyles } from "@material-ui/core/styles";
import daiContractAbi from "../../abi/DAIE.json";
import barberContractAbi from "../../abi/BarberShopNFT.json";
import groceryContractAbi from "../../abi/GroceryStoreNFT.json";
import dinerContractAbi from "../../abi/DinerNFT.json";

import NoSsr from "@material-ui/core/NoSsr";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import { AlertModal } from "../AlertModal/AlertModal";
import Input from "@mui/material/Input";

const useStyles = makeStyles((theme) => ({
  root: {
    "&.MuiIconButton-root	": {
      color: "#93100D",
    },
  },
}));

export default function MapPins() {
  const [isOpenBarber, setIsOpenBarber] = useState(false);
  const [isOpenGrocery, setIsOpenGrocery] = useState(false);
  const [isOpenDiner, setIsOpenDiner] = useState(false);
  const [isOpenBank, setIsOpenBank] = useState(false);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [nftQuantity, setNftQuantity] = useState(0);
  const [hasMM, setHasMM] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [approvedBarber, setApprovedBarber] = useState(false);
  const [approvedGrocery, setApprovedGrocery] = useState(false);
  const [approvedDiner, setApprovedDiner] = useState(false);
  const [btnTextBarber, setBtnTextBarber] = useState("Approve");
  const [btnTextGrocery, setBtnTextGrocery] = useState("Approve");
  const [btnTextDiner, setBtnTextDiner] = useState("Approve");
  const [selectedAccount, setSelectedAccount] = useState("");

  const classes = useStyles();
  const { account, active } = useWeb3React();
  const dai_address = "0x81d5ea624DF2E5871728B09182b34aede41EA399";
  const barber_address = "0x4c760e5a721631cA7c2060f4E277965E39DeC095";
  const grocery_address = "0xe5Cfa462EF279392713B930c56244F0D71c0a395";
  const diner_address = "0xf2AC2971EED4C7F8e4B596386FE7e01487E774e7";

  async function barberAllowance() {
    const web3 = new Web3(Web3.givenProvider);
    const daiContract = new web3.eth.Contract(daiContractAbi, dai_address);
    const barberContract = new web3.eth.Contract(
      barberContractAbi,
      barber_address
    );
    let allowanceTx;
    let mintPrice;
    try {
      mintPrice = await barberContract.methods.getMintingPrice(account).call();
      allowanceTx = await daiContract.methods
        .allowance(selectedAccount, barber_address)
        .call();
      console.log("allowanceTx", allowanceTx);
    } catch (err) {
      console.log("err on allowance transaction", err);
    } finally {
      console.log('barber price',mintPrice);
      allowanceTx < mintPrice
        ? setApprovedBarber(false)
        : setApprovedBarber(true);
      approvedBarber == true ? setBtnTextBarber("Mint") : setBtnTextBarber("Approve");
    }
  }

  async function groceryAllowance() {
    const web3 = new Web3(Web3.givenProvider);
    const daiContract = new web3.eth.Contract(daiContractAbi, dai_address);
    const groceryContract = new web3.eth.Contract(
      groceryContractAbi,
      grocery_address
    );
    let allowanceTx;
    let mintPrice;
    try {
      mintPrice = await groceryContract.methods.getMintingPrice(account).call();
      allowanceTx = await daiContract.methods
        .allowance(selectedAccount, grocery_address)
        .call();
      console.log("allowanceTx", allowanceTx);
    } catch (err) {
      console.log("err on allowance transaction", err);
    } finally {
      console.log('groceryprice',mintPrice);
      allowanceTx < mintPrice
        ? setApprovedGrocery(false)
        : setApprovedGrocery(true);
      approvedGrocery == true ? setBtnTextBarber("Mint") : setBtnTextBarber("Approve");
    }
  }

  async function dinerAllowance() {
    const web3 = new Web3(Web3.givenProvider);
    const daiContract = new web3.eth.Contract(daiContractAbi, dai_address);
    const dinerContract = new web3.eth.Contract(
      dinerContractAbi,
      diner_address
    );
    let allowanceTx;
    let mintPrice;
    try {
      mintPrice = await dinerContract.methods.getMintingPrice(account).call();
      allowanceTx = await daiContract.methods
        .allowance(selectedAccount, diner_address)
        .call();
      console.log('dinerContract', dinerContract)
      console.log("allowanceTx", allowanceTx);
    } catch (err) {
      console.log("err on allowance transaction", err);
    } finally {
      console.log('dinerprice', mintPrice);
      allowanceTx < mintPrice
        ? setApprovedDiner(false)
        : setApprovedDiner(true);
      approvedDiner == true ? setBtnTextDiner("Mint") : setBtnTextDiner("Approve");
    }
  }

  async function getMinimalAllowance() {
    if (selectedAccount) {
      await barberAllowance();
      await groceryAllowance();
      await dinerAllowance();
    }
  }

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMM(true);
      setSelectedAccount(window.ethereum.selectedAddress);
      getMinimalAllowance();
    }
  }, [selectedAccount, account]);

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
    setIsOpenAlert(true);
  };

  const handleAlertClose = () => {
    setIsOpenAlert(false);
  };

  const handleQuantity = (e) => {
    setNftQuantity(e.target.value);
    console.log(e.target.value);
  };

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

  async function mintBarber() {
    const web3 = new Web3(Web3.givenProvider);
    const daiContract = new web3.eth.Contract(daiContractAbi, dai_address);
    const barberContract = new web3.eth.Contract(
      barberContractAbi,
      barber_address
    );
    let approveTx;
    let allowanceTx;
    let mintPrice;
    try {
      mintPrice = await barberContract.methods.getMintingPrice(account).call();
      allowanceTx = await daiContract.methods
        .allowance(selectedAccount, barber_address)
        .call();
      console.log("allowanceTx", allowanceTx);
    } catch (err) {
      console.log("err on allowance transaction", err);
    } finally {
      allowanceTx < mintPrice ? setApprovedBarber(false) : setApprovedBarber(true);
      approvedBarber == true ? setBtnTextBarber("Mint") : setBtnTextBarber("Approve");
    }

    if (!approvedBarber) {
      try {
        let totalValue;
        console.log("mintPrice", mintPrice);
        totalValue = nftQuantity * mintPrice;
        console.log("totalValue", totalValue);
        approveTx = await daiContract.methods
          .approve(barber_address, totalValue.toString())
          .send({ from: selectedAccount })
          .on("transactionHash", function (hash) {
            setBtnTextBarber("Approving...");
            setIsError(false);
          })
          .on("receipt", function (receipt) {
            console.log("receipt", receipt);
            setApprovedBarber(true);
            setBtnTextBarber("Mint");
            setIsError(false);
          })
          .on("error", (err) => {
            console.log("error", err);
            setBtnTextBarber("Approve");
            setIsError(true);
            setErrorMessage(
              "There was an error on the approve transaction. Check your wallet and try again."
            );
          });

        if (allowanceTx >= mintPrice) {
          setBtnTextBarber("Mint");
        }
      } catch (err) {
        console.log(err);
        setApprovedBarber(false);
      } finally {
        if (approveTx) {
          setApprovedBarber(true);
          setBtnTextBarber("Mint");
        }
      }
    }
    if (approvedBarber) {
      try {
        let mintTx = await barberContract.methods
          .safeMint(selectedAccount, nftQuantity)
          .send({ from: selectedAccount })
          .on("transactionHash", function (hash) {
            setBtnTextBarber("Minting...");
            setIsError(false);
          })
          .on("receipt", (receipt) => {
            console.log("receipt", receipt);
            setBtnTextBarber("Mint");
            setApprovedBarber(true);
            setNftQuantity(0);
            setIsError(false);
          })
          .on("error", (err) => {
            console.log("err", err);
            setApprovedBarber(false);
            setBtnTextBarber("Mint");
            setIsError(true);
            setErrorMessage(
              "There was an error on the mint transaction. Check your wallet and try again."
            );
          });
      } catch (err) {
        console.log("err mint", err);
      }
    }
    if (!active) {
      handleAlert();
    }
  }

  async function mintGrocery() {
    const web3 = new Web3(Web3.givenProvider);
    const daiContract = new web3.eth.Contract(daiContractAbi, dai_address);
    const groceryContract = new web3.eth.Contract(
      groceryContractAbi,
      grocery_address
    );
    let approveTx;
    let allowanceTx;
    let mintPrice;
    try {
      mintPrice = await groceryContract.methods.getMintingPrice(account).call();
      allowanceTx = await daiContract.methods
        .allowance(selectedAccount, grocery_address)
        .call();
      console.log("allowanceTx", allowanceTx);
    } catch (err) {
      console.log("err on allowance transaction", err);
    } finally {
      allowanceTx < mintPrice ? setApprovedGrocery(false) : setApprovedGrocery(true);
      approvedGrocery == true ? setBtnTextGrocery("Mint") : setBtnTextGrocery("Approve");
    }

    if (!approvedGrocery) {
      try {
        let totalValue;
        console.log("mintPrice", mintPrice);
        totalValue = nftQuantity * mintPrice;
        console.log("totalValue", totalValue);
        approveTx = await daiContract.methods
          .approve(grocery_address, totalValue.toString())
          .send({ from: selectedAccount })
          .on("transactionHash", function (hash) {
            setBtnTextGrocery("Approving...");
            setIsError(false);
          })
          .on("receipt", function (receipt) {
            console.log("receipt", receipt);
            setApprovedGrocery(true);
            setBtnTextGrocery("Mint");
            setIsError(false);
          })
          .on("error", (err) => {
            console.log("error", err);
            setBtnTextGrocery("Approve");
            setApprovedGrocery(false);
            setIsError(true);
            setErrorMessage(
              "There was an error on the approve transaction. Check your wallet and try again."
            );
          });

        if (allowanceTx >= mintPrice) {
          setBtnTextGrocery("Mint");
        }
      } catch (err) {
        console.log(err);
        setApprovedGrocery(false);
      } finally {
        if (approveTx) {
          setApprovedGrocery(true);
          setBtnTextGrocery("Mint");
        }
      }
    }
    if (approvedGrocery) {
      try {
        let mintTx = await groceryContract.methods
          .safeMint(selectedAccount, nftQuantity)
          .send({ from: selectedAccount })
          .on("transactionHash", function (hash) {
            setBtnTextGrocery("Minting...");
            setIsError(false);
          })
          .on("receipt", (receipt) => {
            console.log("receipt", receipt);
            setBtnTextGrocery("Mint");
            setApprovedGrocery(true);
            setNftQuantity(0);
            setIsError(false);
          })
          .on("error", (err) => {
            console.log("err", err);
            setApprovedGrocery(false);
            setBtnTextGrocery("Mint");
            setIsError(true);
            setErrorMessage(
              "There was an error on the mint transaction. Check your wallet and try again."
            );
          });
      } catch (err) {
        console.log("err mint", err);
      }
    }
    if (!active) {
      handleAlert();
    }
  }

  async function mintDiner() {
    const web3 = new Web3(Web3.givenProvider);
    const daiContract = new web3.eth.Contract(daiContractAbi, dai_address);
    const dinerContract = new web3.eth.Contract(
      dinerContractAbi,
      diner_address
    );
    let approveTx;
    let allowanceTx;
    let mintPrice;
    try {
      mintPrice = await dinerContract.methods.getMintingPrice(account).call();
      allowanceTx = await daiContract.methods
        .allowance(selectedAccount, diner_address)
        .call();
      console.log("allowanceTx", allowanceTx);
    } catch (err) {
      console.log("err on allowance transaction", err);
    } finally {
      allowanceTx < mintPrice ? setApprovedDiner(false) : setApprovedDiner(true);
      approvedDiner == true ? setBtnTextDiner("Mint") : setBtnTextDiner("Approve");
    }

    if (!approvedDiner) {
      try {
        let totalValue;
        console.log("mintPrice", mintPrice);
        totalValue = nftQuantity * mintPrice;
        console.log("totalValue", totalValue);
        approveTx = await daiContract.methods
          .approve(diner_address, totalValue.toString())
          .send({ from: selectedAccount })
          .on("transactionHash", function (hash) {
            setBtnTextDiner("Approving...");
            setIsError(false);
          })
          .on("receipt", function (receipt) {
            console.log("receipt", receipt);
            setApprovedDiner(true);
            setBtnTextDiner("Mint");
            setIsError(false);
          })
          .on("error", (err) => {
            console.log("error", err);
            setBtnTextDiner("Approve");
            setIsError(true);
            setErrorMessage(
              "There was an error on the approve transaction. Check your wallet and try again."
            );
          });

        if (allowanceTx >= mintPrice) {
          setBtnTextDiner("Mint");
        }
      } catch (err) {
        console.log(err);
        setApprovedDiner(false);
      } finally {
        if (approveTx) {
          setApprovedDiner(true);
          setBtnTextDiner("Mint");
        }
      }
    }
    if (approvedDiner) {
      try {
        let mintTx = await dinerContract.methods
          .safeMint(selectedAccount, nftQuantity)
          .send({ from: selectedAccount })
          .on("transactionHash", function (hash) {
            setBtnTextDiner("Minting...");
            setIsError(false);
          })
          .on("receipt", (receipt) => {
            console.log("receipt", receipt);
            setBtnTextDiner("Mint");
            setApprovedDiner(true);
            setNftQuantity(0);
            setIsError(false);
          })
          .on("error", (err) => {
            console.log("err", err);
            setApprovedDiner(false);
            setBtnTextDiner("Mint");
            setIsError(true);
            setErrorMessage(
              "There was an error on the mint transaction. Check your wallet and try again."
            );
          });
      } catch (err) {
        console.log("err mint", err);
      }
    }
    if (!active) {
      handleAlert();
    }
  }

  async function Mint(item) {
    if (
      typeof window.ethereum !== "undefined" &&
      window.ethereum.selectedAddress
    ) {
      if (item == "Barber") {
        await mintBarber();
      }
      if(item == 'Grocery'){
        await mintGrocery();
      }
      if(item == 'Diner'){
        await mintDiner();
      }
    }
  }

  return (
    <>
      <AlertModal isOpen={isOpenAlert} handleClose={() => handleAlertClose()}>
        You need to be connected to the MetaMask
      </AlertModal>
      <CustomModal
        isOpen={isOpenBarber}
        handleClose={() => handleClose("barber")}
        title="Mint for the Barbershop"
        handleMint={() => Mint("Barber")}
        buttonText={btnTextBarber}
        nftName="Barber"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam,
        cupiditate.
        <span style={{ display: "block" }}>
          <Input
            placeholder="How many nfts"
            type="number"
            onChange={(e) => handleQuantity(e)}
          />
        </span>
        {isError && <p style={{ color: "red" }}>{errorMessage}</p>}
      </CustomModal>

      <CustomModal
        isOpen={isOpenGrocery}
        handleClose={() => handleClose("grocery")}
        title="Mint for the Grocery Store"
        handleMint={() => Mint("Grocery")}
        buttonText={btnTextGrocery}
        nftName="Tomatoes"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam,
        cupiditate.
        <span style={{ display: "block" }}>
          <Input
            placeholder="How many nfts"
            type="number"
            onChange={(e) => handleQuantity(e)}
          />
        </span>
        {isError && <p style={{ color: "red" }}>{errorMessage}</p>}
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
        handleMint={() => Mint("Diner")}
        buttonText={btnTextDiner}
        nftName="Coffee"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam,
        cupiditate.
        <span style={{ display: "block" }}>
          <Input
            placeholder="How many nfts"
            type="number"
            onChange={(e) => handleQuantity(e)}
          />
        </span>
        {isError && <p style={{ color: "red" }}>{errorMessage}</p>}
      </CustomModal>
      <NoSsr>
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
      </NoSsr>
    </>
  );
}