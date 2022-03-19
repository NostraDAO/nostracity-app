import React, { useState, useEffect, InputHTMLAttributes } from "react";
import styles from "./MapPins.module.css";
import PushPin2FillIcon from "remixicon-react/Pushpin2FillIcon";
import BankFillIcon from "remixicon-react/BankFillIcon";
import TrophyLineIcon from "remixicon-react/TrophyLineIcon";
import IconButton from "@material-ui/core/IconButton";
import { CustomModal } from "../CustomModal/CustomModal";
import { BankModal } from "../BankModal/BankModal";
import { RankingModal } from "../RankingModal/RankingModal";
import { makeStyles } from "@material-ui/core/styles";
import daiContractAbi from "../../abi/DAIE.json";
import barberContractAbi from "../../abi/BarberShopNFT.json";
import groceryContractAbi from "../../abi/GroceryStoreNFT.json";
import dinerContractAbi from "../../abi/DinerNFT.json";
import {
  diner_address,
  barber_address,
  grocery_address,
  dai_address,
} from "../../constants/adresses/contracts";
import {
  getBarberLimit,
  getGroceryLimit,
  getDinerLimit,
} from "../../utils/nftLimitFunctions";

import NoSsr from "@material-ui/core/NoSsr";
const Web3 = require("web3");
import { useWeb3React } from "@web3-react/core";
import { AlertModal } from "../AlertModal/AlertModal";
import Input from "@mui/material/Input";
import Tooltip from "@mui/material/Tooltip";

declare var window: any;

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
  const [isOpenRank, setIsOpenRank] = useState(false);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSucessful, setIsSucessful] = useState(false);
  const [sucessfulMessage, setSucessfulMessage] = useState("");
  const [approvedBarber, setApprovedBarber] = useState(false);
  const [approvedGrocery, setApprovedGrocery] = useState(false);
  const [approvedDiner, setApprovedDiner] = useState(false);
  const [btnTextBarber, setBtnTextBarber] = useState("Approve");
  const [btnTextGrocery, setBtnTextGrocery] = useState("Approve");
  const [btnTextDiner, setBtnTextDiner] = useState("Approve");
  const [isApproving, setIsApproving] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [allowanceValueBarber, setAllowanceValueBarber] = useState(0);
  const [allowanceValueGrocery, setAllowanceValueGrocery] = useState(0);
  const [allowanceValueDiner, setAllowanceValueDiner] = useState(0);
  const [mintPriceBarber, setMintPriceBarber] = useState(0);
  const [mintPriceGrocery, setMintPriceGrocery] = useState(0);
  const [mintPriceDiner, setMintPriceDiner] = useState(0);
  const [barberQuantity, setBarberQuantity] = useState<number>(0);
  const [groceryQuantity, setGroceryQuantity] = useState<number>(0);
  const [dinerQuantity, setDinerQuantity] = useState<number>(0);
  const [lockInput, setLockInput] = useState(false);
  const [barberLimit, setBarberLimit] = useState<number>(0);
  const [groceryLimit, setGroceryLimit] = useState<number>(0);
  const [dinerLimit, setDinerLimit] = useState<number>(0);

  let totalValueBarber: any;
  let totalValueGrocery: any;
  let totalValueDiner: any;
  const classes = useStyles();
  const { account, active } = useWeb3React();

  async function barberAllowanceChecker() {
    const web3 = new Web3(Web3.givenProvider);
    const daiContract = new web3.eth.Contract(
      daiContractAbi as any,
      dai_address
    );
    const barberContract = new web3.eth.Contract(
      barberContractAbi as any,
      barber_address
    );
    let allowanceTx;
    let mintPrice;
    try {
      mintPrice =
        (await barberContract.methods.getMintingPrice(account).call()) /
        10 ** 18;
      allowanceTx =
        (await daiContract.methods.allowance(account, barber_address).call()) /
        10 ** 18;
      setMintPriceBarber(mintPrice);
      setAllowanceValueBarber(allowanceTx);
      if (allowanceValueBarber >= mintPriceBarber) {
        setApprovedBarber(true);
        setBtnTextBarber("Mint");
      } else {
        setApprovedBarber(false);
        setBtnTextBarber("Approve");
      }
    } catch (err: any) {
      console.log(
        "Error on getting mint price for Scissors or allowance of DAI: ",
        err.message
      );
    }
  }

  async function groceryAllowanceChecker() {
    const web3 = new Web3(Web3.givenProvider);
    const daiContract = new web3.eth.Contract(
      daiContractAbi as any,
      dai_address
    );
    const groceryContract = new web3.eth.Contract(
      groceryContractAbi as any,
      grocery_address
    );
    let allowanceTx;
    let mintPrice;
    try {
      mintPrice =
        (await groceryContract.methods.getMintingPrice(account).call()) /
        10 ** 18;
      allowanceTx =
        (await daiContract.methods.allowance(account, grocery_address).call()) /
        10 ** 18;
      setMintPriceGrocery(mintPrice);
      setAllowanceValueGrocery(allowanceTx);
      if (allowanceValueGrocery >= mintPriceGrocery) {
        setApprovedGrocery(true);
        setBtnTextGrocery("Mint");
      } else {
        setApprovedGrocery(false);
        setBtnTextGrocery("Approve");
      }
    } catch (err: any) {
      console.log(
        "Error on getting mint price for Tomatoes  or allowance of DAI: ",
        err.message
      );
    }
  }

  async function dinerAllowanceChecker() {
    const web3 = new Web3(Web3.givenProvider);
    const daiContract = new web3.eth.Contract(
      daiContractAbi as any,
      dai_address
    );
    const dinerContract = new web3.eth.Contract(
      dinerContractAbi as any,
      diner_address
    );
    let allowanceTx;
    let mintPrice;
    try {
      mintPrice =
        (await dinerContract.methods.getMintingPrice(account).call()) /
        10 ** 18;
      allowanceTx =
        (await daiContract.methods.allowance(account, diner_address).call()) /
        10 ** 18;
      setMintPriceDiner(mintPrice);
      setAllowanceValueDiner(allowanceTx);
      console.log("😒", allowanceValueDiner, mintPriceDiner);
      if (allowanceValueDiner >= mintPriceDiner) {
        setApprovedDiner(true);
        setBtnTextDiner("Mint");
      } else {
        setApprovedDiner(false);
        setBtnTextDiner("Approve");
      }
    } catch (err: any) {
      console.log(
        "Error on getting mint price for Coffee or allowance of DAI: ",
        err.message
      );
    }
  }

  async function getMinimalAllowance() {
    if (account) {
      await barberAllowanceChecker();
      await groceryAllowanceChecker();
      await dinerAllowanceChecker();
    }
  }

  useEffect(() => {
    let passed = true;
    if (typeof window.ethereum !== "undefined" && account && passed) {
      getMinimalAllowance();
      getBarberLimit().then((amount) => {
        setBarberLimit(amount);
      });

      getGroceryLimit().then((amount) => {
        setGroceryLimit(amount);
      });

      getDinerLimit().then((amount) => {
        setDinerLimit(amount);
      });
    }
    return () => {
      passed = false;
    }
  }, [
    account,
    allowanceValueBarber,
    allowanceValueGrocery,
    allowanceValueDiner,
    barberLimit,
    groceryLimit,
    dinerLimit,
  ]);

  const handleOpen = (item: string) => {
    if (item == "barber") {
      setIsOpenBarber(true);
      barberAllowanceChecker();
      setBarberQuantity(0);
    }
    if (item == "grocery") {
      setIsOpenGrocery(true);
      groceryAllowanceChecker();
      setGroceryQuantity(0);
    }
    if (item == "diner") {
      setIsOpenDiner(true);
      dinerAllowanceChecker();
      setDinerQuantity(0);
    }
    if (item == "bank") {
      setIsOpenBank(true);
    }
    if (item == "trophy") {
      setIsOpenRank(true);
    }
  };

  const handleAlert = () => {
    setIsOpenAlert(true);
  };

  const handleAlertClose = () => {
    setIsOpenAlert(false);
  };

  const handleQuantity = (
    event: React.KeyboardEvent<HTMLInputElement>,
    item: string
  ) => {
    switch (item) {
      case "barber": {
        setBarberQuantity(Number((event.target as HTMLInputElement).value));
      }
      case "grocery": {
        setGroceryQuantity(Number((event.target as HTMLInputElement).value));
        
      }
      case "diner": {
        setDinerQuantity(Number((event.target as HTMLInputElement).value));

      }
    }
    setIsError(false);
    setErrorMessage("");
    setIsSucessful(false);
    setSucessfulMessage("");
    setIsProcessing(false);
  };

 

  const handleClose = (item: string) => {
    if (item == "barber") {
      setIsOpenBarber(false);
      setIsError(false);
      setErrorMessage("");
      setBarberQuantity(0);
      setSucessfulMessage('');
    }
    if (item == "grocery") {
      setIsOpenGrocery(false);
      setIsError(false);
      setErrorMessage("");
      setGroceryQuantity(0);
      setSucessfulMessage('');
    }
    if (item == "diner") {
      setIsOpenDiner(false);
      setIsError(false);
      setErrorMessage("");
      setDinerQuantity(0);
      setSucessfulMessage('');
    }
    if (item == "bank") {
      setIsOpenBank(false);
    }
    if (item == "trophy") {
      setIsOpenRank(false);
    }
  };

  async function mintBarber() {
    let approveTx;
    const web3 = new Web3(Web3.givenProvider);
    const daiContract = new web3.eth.Contract(
      daiContractAbi as any,
      dai_address
    );
    const barberContract = new web3.eth.Contract(
      barberContractAbi as any,
      barber_address
    );
    barberAllowanceChecker();
    //complete the function to get the total amount of nft
    if (barberQuantity >= barberLimit) {
      console.log("total amou", barberLimit);
      setIsError(true);
      setErrorMessage(`Nft limit exceeded on this account: ${barberLimit}`);
      setIsProcessing(true);
    }
    totalValueBarber = barberQuantity * mintPriceBarber;
    let weiBarber = web3.utils.toWei(totalValueBarber.toString());

    if (!approvedBarber) {
      if (barberQuantity <= barberLimit) {
        try {
          approveTx = daiContract.methods
            .approve(barber_address, weiBarber)
            .send({ from: account })
            .on("transactionHash", function (hash: any) {
              setBtnTextBarber("Approving...");
              setIsError(false);
              setLockInput(true);
              setIsProcessing(true);
            })
            .on("receipt", function (receipt: any) {
              setApprovedBarber(true);
              setBtnTextBarber("Mint");
              setIsError(false);
              setLockInput(false);
              setIsProcessing(false);
              setIsSucessful(true);
              setSucessfulMessage("Approval for usage of DAI sucessful!");
              barberAllowanceChecker();
            })
            .on("error", (err: any) => {
              console.log("error", err);
              setBtnTextBarber("Approve");
              setIsError(true);
              setLockInput(false);
              setErrorMessage(
                "There was an error on the approve transaction. Check your wallet and try again."
              );
            });
        } catch (err: any) {
          console.log(err);
          barberAllowanceChecker();
        }
      } else {
        setIsError(true);
        setErrorMessage(`Nft limit exceeded on this account: ${barberLimit}`);
        setIsProcessing(true);
      }
    }
    if (approvedBarber) {
      if (barberQuantity <= barberLimit) {
        try {
          let mintTx = barberContract.methods
            .safeMint(account, barberQuantity)
            .send({ from: account })
            .on("transactionHash", function (hash: any) {
              setBtnTextBarber("Minting...");
              setIsError(false);
              setLockInput(true);
              setIsProcessing(true);
            })
            .on("receipt", (receipt: any) => {
              console.log("receipt", receipt);
              setBtnTextBarber("Mint");
              setIsError(false);
              setLockInput(false);
              setIsProcessing(false);
              setIsSucessful(true);
              setSucessfulMessage("Scissor minted successfully!!");
              barberAllowanceChecker();
            })
            .on("error", (err: any) => {
              console.log("err", err);
              barberAllowanceChecker();
              setIsError(true);
              setErrorMessage(
                "There was an error on the mint transaction. Check your wallet and try again."
              );
              setLockInput(false);
              setIsProcessing(false);
            });
        } catch (err: any) {
          console.log("err mint", err);
          setLockInput(false);
          setIsProcessing(false);
        }

        if (!active) {
          handleAlert();
        }
      } else {
        setIsError(true);
        setErrorMessage(`Nft limit exceeded on this account: ${barberLimit}`);
        setIsProcessing(true);
      }
    }
  }

  async function mintGrocery() {
    const web3 = new Web3(Web3.givenProvider);
    let approveTx;
    let allowanceTx;
    const daiContract = new web3.eth.Contract(
      daiContractAbi as any,
      dai_address
    );
    const groceryContract = new web3.eth.Contract(
      groceryContractAbi as any,
      grocery_address
    );
    groceryAllowanceChecker();
    //complete the function to get the total amount of nft
    totalValueGrocery = groceryQuantity * mintPriceGrocery;
    let weiGrocery = web3.utils.toWei(totalValueGrocery.toString());
    if (!approvedGrocery) {
      if (groceryQuantity <= groceryLimit) {
        try {
          approveTx = daiContract.methods
            .approve(grocery_address, weiGrocery)
            .send({ from: account })
            .on("transactionHash", function (hash: any) {
              setBtnTextGrocery("Approving...");
              setIsError(false);
              setIsProcessing(true);
              setLockInput(true);
            })
            .on("receipt", function (receipt: any) {
              setApprovedGrocery(true);
              setBtnTextGrocery("Mint");
              setIsError(false);
              setLockInput(false);
              setIsProcessing(false);
              setIsSucessful(true);
              setSucessfulMessage("Approval for usage of DAI sucessful!");
            })
            .on("error", (err: any) => {
              console.log("error", err);
              setBtnTextGrocery("Approve");
              setIsError(true);
              setErrorMessage(
                "There was an error on the approve transaction. Check your wallet and try again."
              );
              setLockInput(false);
              setIsProcessing(false);
            });
        } catch (err: any) {
          console.log(err);
          setLockInput(false);
          setIsProcessing(false);
          groceryAllowanceChecker();
        }
      } else {
        setIsError(true);
        setErrorMessage(`Nft limit exceeded on this account: ${groceryLimit}`);
        setIsProcessing(true);
      }
    }
    if (approvedGrocery) {
      if (groceryQuantity <= groceryLimit) {
        try {
          let mintTx = groceryContract.methods
            .safeMint(account, groceryQuantity)
            .send({ from: account })
            .on("transactionHash", function (hash: any) {
              setBtnTextGrocery("Minting...");
              setIsError(false);
              setLockInput(true);
              setIsProcessing(true);
            })
            .on("receipt", (receipt: any) => {
              console.log("receipt", receipt);
              setBtnTextGrocery("Mint");
              groceryAllowanceChecker();
              setIsError(false);
              setLockInput(false);
              setIsProcessing(false);
              setIsSucessful(true);
              setSucessfulMessage("Tomatoe minted sucessfully!");
              groceryAllowanceChecker();
            })
            .on("error", (err: any) => {
              console.log("err", err);
              groceryAllowanceChecker();
              setIsError(true);
              setErrorMessage(
                "There was an error on the mint transaction. Check your wallet and try again."
              );
              setLockInput(false);
              setIsProcessing(false);
            });
        } catch (err: any) {
          console.log("err mint", err);
          setIsProcessing(false);
          setLockInput(false);
        }

        if (!active) {
          handleAlert();
        }
      } else {
        setIsError(true);
        setErrorMessage(`Nft limit exceeded on this account: ${groceryLimit}`);
        setIsProcessing(true);
      }
    }
  }

  async function mintDiner() {
    const web3 = new Web3(Web3.givenProvider);
    let approveTx;
    const daiContract = new web3.eth.Contract(
      daiContractAbi as any,
      dai_address
    );
    const dinerContract = new web3.eth.Contract(
      dinerContractAbi as any,
      diner_address
    );
    dinerAllowanceChecker();
    //complete the function to get the total amount of nft
    totalValueDiner = dinerQuantity * mintPriceDiner;
    console.log("😊", allowanceValueDiner, totalValueDiner);
    //convert into big number and then into wei
    let weiDiner = web3.utils.toWei(totalValueDiner.toString());
    if (!approvedDiner) {
      if (dinerQuantity <= dinerLimit) {
        try {
          approveTx = daiContract.methods
            .approve(diner_address, weiDiner)
            .send({ from: account })
            .on("transactionHash", function (hash: any) {
              setBtnTextDiner("Approving...");
              setIsError(false);
              setLockInput(true);
              setIsProcessing(true);
            })
            .on("receipt", function (receipt: any) {
              setApprovedDiner(true);
              setBtnTextDiner("Mint");
              setIsError(false);
              setLockInput(false);
              setIsProcessing(false);
              setIsSucessful(true);
              setSucessfulMessage("Approval for usage of DAI sucessful!");
              dinerAllowanceChecker();
            })
            .on("error", (err: any) => {
              console.log("error", err);
              dinerAllowanceChecker();
              setIsError(true);
              setErrorMessage(
                "There was an error on the approve transaction. Check your wallet and try again."
              );
              setIsProcessing(false);
              setLockInput(false);
            });
        } catch (err: any) {
          console.log(err);
          setIsProcessing(false);
          setLockInput(false);
        }
      } else {
        setIsError(true);
        setErrorMessage(`Nft limit exceeded on this account: ${dinerLimit}`);
        setIsProcessing(true);
      }
    }
    if (approvedDiner) {
      if (dinerQuantity <= dinerLimit) {
        try {
          let mintTx = dinerContract.methods
            .safeMint(account, dinerQuantity)
            .send({ from: account })
            .on("transactionHash", function (hash: any) {
              setBtnTextDiner("Minting...");
              setIsError(false);
              setLockInput(true);
              setIsProcessing(true);
            })
            .on("receipt", (receipt: any) => {
              console.log("receipt", receipt);
              setBtnTextDiner("Mint");
              setIsError(false);
              setLockInput(false);
              setIsProcessing(false);
              setIsSucessful(true);
              setSucessfulMessage("Coffee minted sucessfully!");
              dinerAllowanceChecker();
            })
            .on("error", (err: any) => {
              console.log("err", err);
              dinerAllowanceChecker();
              setIsProcessing(false);
              setLockInput(false);
              setIsError(true);
              setErrorMessage(
                "There was an error on the mint transaction. Check your wallet and try again."
              );
            });
        } catch (err: any) {
          console.log("err mint", err);
          setIsProcessing(false);
          setLockInput(false);
        }
      } else {
        setIsError(true);
        setErrorMessage(`Nft limit exceeded on this account: ${dinerLimit}`);
        setIsProcessing(true);
      }
    }
    if (!active) {
      handleAlert();
    }
  }

  async function Mint(item: string) {
    if (barberQuantity === 0 || null) {
      setIsError(true);
      setErrorMessage(
        "This is an invalid value for approving or minting. Please add at least 1"
      );
    }
    if (groceryQuantity === 0 || null) {
      setIsError(true);
      setErrorMessage(
        "This is an invalid value for approving or minting. Please add at least 1"
      );
    } 
    if (dinerQuantity === 0 || null) {
      setIsError(true);
      setErrorMessage(
        "This is an invalid value for approving or minting. Please add at least 1"
      );
    }
    else {
      if (
        typeof window.ethereum !== "undefined" &&
        window.ethereum.selectedAddress
      ) {
        setIsError(false);
        if (item == "Barber") {
          await mintBarber();
        }
        if (item == "Grocery") {
          await mintGrocery();
        }
        if (item == "Diner") {
          await mintDiner();
        }
      }
    }
  }

  function handleNftPriceQuantity(item) {
    switch (item) {
      case "barber": {
        return  mintPriceBarber * barberQuantity + " DAI";  
      }
      case "grocery": {
        return mintPriceGrocery * groceryQuantity + " DAI";
      }
      case "diner": {
        return mintPriceDiner * dinerQuantity + " DAI";
      }
    }
  }

  const barberText =
    "Hector Barbershop - Managed by the Colombo Family. Click to buy scissors.";
  const groceryText =
    "Rome Grocery Store - Managed by the Gambino Family. Click to buy tomatoes.";
  const dinerText =
    "Olympus Diner - Managed by the Genovese Family. Click to buy coffees.";
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
        isDisabled={isProcessing}
        nftName="Barber"
      >
        <p style={{ maxWidth: "70%", textAlign: "center", margin: "auto" }}>
          Welcome, my good fella, to the Hector Barbershop. In order to become a
          made-man in the Colombo family - click on “Approve” button below, and
          then “Mint”, in order to get your scissors. Those scissors will come
          in handy later, so keep ‘em safe and join the Colombo Family on
          discord for more.
        </p>
        <span style={{ display: "block" }}>
          <Input
            disabled={lockInput}
            placeholder="How many nfts"
            type="number"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleQuantity(e as any, 'barber')
            }
          />
        </span>
        <span style={{ display: "inline-block", marginTop: "8px" }}>
          Value of DAI for the minting: {handleNftPriceQuantity("barber")}
        </span>
        {isSucessful && <p style={{ color: "green" }}>{sucessfulMessage}</p>}
        {isError && <p style={{ color: "red" }}>{errorMessage}</p>}
      </CustomModal>

      <CustomModal
        isOpen={isOpenGrocery}
        handleClose={() => handleClose("grocery")}
        title="Mint for the Grocery Store"
        handleMint={() => Mint("Grocery")}
        buttonText={btnTextGrocery}
        isDisabled={isProcessing}
        nftName="Tomatoes"
      >
        <p style={{ maxWidth: "70%", textAlign: "center", margin: "auto" }}>
          Welcome, my good fella, to the Rome Grocery Store. In order to become
          a made-man in the Genovese family - click on “Approve” button below,
          and then “Mint”, in order to get your tomatoes. Those tomatoes will
          come in handy later, so keep ‘em safe and join the Colombo Family on
          discord for more.{" "}
        </p>
        <span style={{ display: "block" }}>
          <Input
            disabled={lockInput}
            placeholder="How many nfts"
            type="number"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleQuantity(e as any, 'grocery')
            }
          />
        </span>
        <span style={{ display: "inline-block", marginTop: "8px" }}>
          Value of DAI for the minting: {handleNftPriceQuantity("grocery")}
        </span>
        {isSucessful && <p style={{ color: "green" }}>{sucessfulMessage}</p>}
        {isError && <p style={{ color: "red" }}>{errorMessage}</p>}
      </CustomModal>

      <CustomModal
        isOpen={isOpenDiner}
        handleClose={() => handleClose("diner")}
        title="Mint for the Diner"
        handleMint={() => Mint("Diner")}
        buttonText={btnTextDiner}
        isDisabled={isProcessing}
        nftName="Coffee"
      >
        <p style={{ maxWidth: "70%", textAlign: "center", margin: "auto" }}>
          Welcome, my good fella, to the Olympus Diner. In order to become a
          made-man in the Genovese family - click on “Approve” button below, and
          then “Mint”, in order to get your coffees. Those coffees will come in
          handy later, so keep ‘em safe and join the Colombo Family on discord
          for more.{" "}
        </p>
        <span style={{ display: "block" }}>
          <Input
            disabled={lockInput}
            placeholder="How many nfts"
            type="number"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleQuantity(e as any, 'diner')
            }
          />
        </span>

        <span style={{ display: "inline-block", marginTop: "8px" }}>
          Value of DAI for the minting: {handleNftPriceQuantity("diner")}
        </span>
        {isSucessful && <p style={{ color: "green" }}>{sucessfulMessage}</p>}
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

      <RankingModal
        name="rank"
        isOpen={isOpenRank}
        handleClose={() => handleClose("trophy")}
        title="Ranking"
      />
      <NoSsr>
        <div className={styles.mapPins}>
          <Tooltip title={barberText} arrow>
            <IconButton
              className={classes.root}
              onClick={() => handleOpen("barber")}
              color="primary"
              name="barber"
            >
              <PushPin2FillIcon size="36px" />
            </IconButton>
          </Tooltip>
          <Tooltip title={groceryText} arrow>
            <IconButton
              className={classes.root}
              onClick={() => handleOpen("grocery")}
              color="primary"
              name="grocery"
            >
              <PushPin2FillIcon size="36px" />
            </IconButton>
          </Tooltip>
          <Tooltip title={dinerText} arrow>
            <IconButton
              className={classes.root}
              onClick={() => handleOpen("diner")}
              color="primary"
              name="diner"
            >
              <PushPin2FillIcon size="36px" />
            </IconButton>
          </Tooltip>

          <IconButton
            className={classes.root}
            onClick={() => handleOpen("bank")}
            color="primary"
            name="bank"
          >
            <BankFillIcon size="36px" />
          </IconButton>

          <IconButton
            className={classes.root}
            onClick={() => handleOpen("trophy")}
            color="primary"
            name="rank"
          >
            <TrophyLineIcon size="36px" />
          </IconButton>
        </div>
      </NoSsr>
    </>
  );
}
