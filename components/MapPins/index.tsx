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

import NoSsr from "@material-ui/core/NoSsr";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import { AlertModal } from "../AlertModal/AlertModal";
import Input from "@mui/material/Input";
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
  const [nftQuantity, setNftQuantity] = useState(0);

  let totalValueBarber: any;
  let totalValueGrocery: any;
  let totalValueDiner: any;
  const classes = useStyles();
  const { account, active } = useWeb3React();
  const dai_address = "0x4C3827E3122ccd1553Be728b589962442DFe49Ed";
  const barber_address = "0x1C26daC2a2e9Bb057fCC061a1903491bA1B5630C";
  const grocery_address = "0xe2284c96faEdF807B4850d271a01e68fF7a443aE";
  const diner_address = "0xee2e93C1E58BD5BC42eE0365401F2C586f4f1694";

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
      mintPrice = await barberContract.methods.getMintingPrice(account).call();
      allowanceTx = await daiContract.methods
        .allowance(account, barber_address)
        .call();
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
      mintPrice = await groceryContract.methods.getMintingPrice(account).call();
      allowanceTx = await daiContract.methods
        .allowance(account, grocery_address)
        .call();
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
      mintPrice = await dinerContract.methods.getMintingPrice(account).call();
      allowanceTx = await daiContract.methods
        .allowance(account, diner_address)
        .call();
      setMintPriceDiner(mintPrice);
      setAllowanceValueDiner(allowanceTx);
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
    if (typeof window.ethereum !== "undefined") {
      getMinimalAllowance();
    }
  }, [
    account,
    allowanceValueBarber,
    allowanceValueGrocery,
    allowanceValueDiner,
  ]);

  const handleOpen = (item: string) => {
    if (item == "barber") {
      setIsOpenBarber(true);
      if (allowanceValueBarber > 0) {
        setBtnTextBarber("Mint");
        setApprovedBarber(true);
        console.log("handle open", approvedBarber);
      }
    }
    if (item == "grocery") {
      setIsOpenGrocery(true);
      if (allowanceValueGrocery > 0) {
        setBtnTextGrocery("Mint");
        setApprovedGrocery(true);
      }
    }
    if (item == "diner") {
      setIsOpenDiner(true);
      if (allowanceValueDiner > 0) {
        setBtnTextDiner("Mint");
        setApprovedDiner(true);
      }
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

  const handleQuantity = (event: React.KeyboardEvent<HTMLInputElement>) => {

    setNftQuantity(Number((event.target as HTMLInputElement).value));
  };

  const handleClose = (item: string) => {
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

    //complete the function to get the total amount of nft
    totalValueBarber = nftQuantity * mintPriceBarber;
    if (allowanceValueBarber >= totalValueBarber) {
      console.log("😒goes in here");
      setApprovedBarber(true);
      setBtnTextBarber("Mint");
    } else {
      setApprovedBarber(false);
      setBtnTextBarber("Approve");
    }
    console.log("approved on mintButton ", approvedBarber);

    if (!approvedBarber) {
      try {
        totalValueBarber = nftQuantity * mintPriceBarber;
        approveTx = daiContract.methods
          .approve(barber_address, totalValueBarber.toString())
          .send({ from: account })
          .on("transactionHash", function (hash: any) {
            setBtnTextBarber("Approving...");
            setIsError(false);
            setIsProcessing(true);
          })
          .on("receipt", function (receipt: any) {
            setApprovedBarber(true);
            setBtnTextBarber("Mint");
            setIsError(false);
            setIsProcessing(false);
          })
          .on("error", (err: any) => {
            console.log("error", err);
            setBtnTextBarber("Approve");
            setIsError(true);
            setErrorMessage(
              "There was an error on the approve transaction. Check your wallet and try again."
            );
          });
      } catch (err: any) {
        console.log(err);
        barberAllowanceChecker();
        if (approvedBarber) {
          setApprovedBarber(true);
        } else {
          setApprovedBarber(false);
        }
      }
    }
    if (approvedBarber) {
      try {
        let mintTx = barberContract.methods
          .safeMint(account, nftQuantity)
          .send({ from: account })
          .on("transactionHash", function (hash: any) {
            setBtnTextBarber("Minting...");
            setIsError(false);
            setIsProcessing(true);
          })
          .on("receipt", (receipt: any) => {
            console.log("receipt", receipt);
            setBtnTextBarber("Mint");
            barberAllowanceChecker();
            console.log(
              "allowance barber on receipt of mint",
              allowanceValueBarber
            );
            // if (allowanceValueBarber >= totalValueBarber) {
            //   setApprovedBarber(true);
            //   setBtnTextBarber("Mint");
            // } else {
            //   setApprovedBarber(false);
            //   setBtnTextBarber("Approve");
            // }

            setIsError(false);
            setIsProcessing(false);
          })
          .on("error", (err: any) => {
            console.log("err", err);
            if (allowanceValueBarber >= totalValueBarber) {
              setApprovedBarber(true);
              setBtnTextBarber("Mint");
            } else {
              setApprovedBarber(false);
              setBtnTextBarber("Approve");
            }
            setIsError(true);
            setErrorMessage(
              "There was an error on the mint transaction. Check your wallet and try again."
            );
          });
      } catch (err: any) {
        console.log("err mint", err);
      }
    }
    if (!active) {
      handleAlert();
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
    //complete the function to get the total amount of nft
    totalValueGrocery = nftQuantity * mintPriceGrocery;
    if (allowanceValueGrocery >= totalValueGrocery) {
      setApprovedGrocery(true);
      setBtnTextGrocery("Mint");
    } else {
      setApprovedGrocery(false);
      setBtnTextGrocery("Approve");
    }

    if (!approvedGrocery) {
      try {
        totalValueGrocery = nftQuantity * mintPriceGrocery;
        approveTx = daiContract.methods
          .approve(grocery_address, totalValueGrocery.toString())
          .send({ from: account })
          .on("transactionHash", function (hash: any) {
            setBtnTextGrocery("Approving...");
            setIsError(false);
            setIsProcessing(true);
          })
          .on("receipt", function (receipt: any) {
            setApprovedGrocery(true);
            setBtnTextGrocery("Mint");
            setIsError(false);
            setIsProcessing(false);
          })
          .on("error", (err: any) => {
            console.log("error", err);
            setBtnTextGrocery("Approve");
            setIsError(true);
            setErrorMessage(
              "There was an error on the approve transaction. Check your wallet and try again."
            );
          });
      } catch (err: any) {
        console.log(err);
        groceryAllowanceChecker();
        if (approvedGrocery) {
          setApprovedGrocery(true);
        } else {
          setApprovedGrocery(false);
        }
      }
    }
    if (approvedGrocery) {
      try {
        let mintTx = groceryContract.methods
          .safeMint(account, nftQuantity)
          .send({ from: account })
          .on("transactionHash", function (hash: any) {
            setBtnTextGrocery("Minting...");
            setIsError(false);
            setIsProcessing(true);
          })
          .on("receipt", (receipt: any) => {
            console.log("receipt", receipt);
            setBtnTextGrocery("Mint");
            groceryAllowanceChecker();
            setIsError(false);
            setIsProcessing(false);
          })
          .on("error", (err: any) => {
            console.log("err", err);
            if (allowanceValueGrocery >= totalValueGrocery) {
              setApprovedGrocery(true);
              setBtnTextGrocery("Mint");
            } else {
              setApprovedGrocery(false);
              setBtnTextGrocery("Approve");
            }
            setIsError(true);
            setErrorMessage(
              "There was an error on the mint transaction. Check your wallet and try again."
            );
          });
      } catch (err: any) {
        console.log("err mint", err);
      }
    }
    if (!active) {
      handleAlert();
    }
  }

  async function mintDiner() {
    const web3 = new Web3(Web3.givenProvider);
    const daiContract = new web3.eth.Contract(
      daiContractAbi as any,
      dai_address
    );
    const dinerContract = new web3.eth.Contract(
      dinerContractAbi as any,
      diner_address
    );
    //complete the function to get the total amount of nft
    totalValueDiner = nftQuantity * mintPriceDiner;
    if (allowanceValueDiner >= totalValueDiner) {
      setApprovedDiner(true);
      setBtnTextDiner("Mint");
    } else {
      setApprovedDiner(false);
      setBtnTextDiner("Approve");
    }

    if (!approvedDiner) {
      try {
        totalValueDiner = nftQuantity * mintPriceDiner;
        approveTx = daiContract.methods
          .approve(diner_address, totalValueDiner.toString())
          .send({ from: account })
          .on("transactionHash", function (hash: any) {
            setBtnTextDiner("Approving...");
            setIsError(false);
            setIsProcessing(true);
          })
          .on("receipt", function (receipt: any) {
            setApprovedDiner(true);
            setBtnTextDiner("Mint");
            setIsError(false);
            setIsProcessing(false);
          })
          .on("error", (err: any) => {
            console.log("error", err);
            setBtnTextDiner("Approve");
            setIsError(true);
            setErrorMessage(
              "There was an error on the approve transaction. Check your wallet and try again."
            );
          });
      } catch (err: any) {
        console.log(err);
        dinerAllowanceChecker();
        if (approvedDiner) {
          setApprovedDiner(true);
        } else {
          setApprovedDiner(false);
        }
      }
    }
    if (approvedDiner) {
      try {
        let mintTx = dinerContract.methods
          .safeMint(account, nftQuantity)
          .send({ from: account })
          .on("transactionHash", function (hash: any) {
            setBtnTextDiner("Minting...");
            setIsError(false);
            setIsProcessing(true);
          })
          .on("receipt", (receipt: any) => {
            console.log("receipt", receipt);
            setBtnTextDiner("Mint");
            dinerAllowanceChecker();
            setIsError(false);
            setIsProcessing(false);
          })
          .on("error", (err: any) => {
            console.log("err", err);
            if (allowanceValueDiner >= totalValueDiner) {
              setApprovedDiner(true);
              setBtnTextDiner("Mint");
            } else {
              setApprovedDiner(false);
              setBtnTextDiner("Approve");
            }
            setIsError(true);
            setErrorMessage(
              "There was an error on the mint transaction. Check your wallet and try again."
            );
          });
      } catch (err: any) {
        console.log("err mint", err);
      }
    }
    if (!active) {
      handleAlert();
    }
  }

  async function Mint(item: string) {
    if (
      typeof window.ethereum !== "undefined" &&
      window.ethereum.selectedAddress
    ) {
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
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam,
        cupiditate.
        <span style={{ display: "block" }}>
          <Input
            placeholder="How many nfts"
            type="number"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleQuantity(e)
            }
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
        isDisabled={isProcessing}
        nftName="Tomatoes"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam,
        cupiditate.
        <span style={{ display: "block" }}>
          <Input
            placeholder="How many nfts"
            type="number"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleQuantity(e)
            }
          />
        </span>
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
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam,
        cupiditate.
        <span style={{ display: "block" }}>
          <Input
            placeholder="How many nfts"
            type="number"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleQuantity(e)
            }
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

      <RankingModal
        isOpen={isOpenRank}
        handleClose={() => handleClose("trophy")}
        title="Ranking"
      />

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

          <IconButton
            className={classes.root}
            onClick={() => handleOpen("trophy")}
            color="primary"
            name="trophy"
          >
            <TrophyLineIcon size="36px" />
          </IconButton>
        </div>
      </NoSsr>
    </>
  );
}
