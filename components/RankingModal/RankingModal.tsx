import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@material-ui/core/Grid";
import IconButton from "@mui/material/IconButton";

import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";

import barberABI from "../../abi/BarberShopNFT.json";
import groceryABI from "../../abi/GroceryStoreNFT.json";
import dinerABI from "../../abi/DinerNFT.json";

const barber_address = "0x1C26daC2a2e9Bb057fCC061a1903491bA1B5630C";
const grocery_address = "0xe2284c96faEdF807B4850d271a01e68fF7a443aE";
const diner_address = "0xee2e93C1E58BD5BC42eE0365401F2C586f4f1694";
import styles from "./RankingModal.module.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  height: "60%",
  bgcolor: "#F3DFC1",
  boxShadow: 24,
  fontFamily: "OldNewspaperTypes",
  p: 4,
  textAlign: "center",
};

interface Scores {
  business: string;
  score: number;

}


export const RankingModal = ({ isOpen, handleClose, title }: any, Scores) => {
  const web3 = new Web3(Web3.givenProvider);
  const { account } = useWeb3React();
  const [barberScore, setBarberScore] = useState<Scores>({});
  const [groceryScore, setGroceryScore] = useState<Scores>({});
  const [dinerScore, setDinerScore] = useState<Scores>({});
  const [rankArray, setRankArray] = useState([]);

  async function getBarberScore() {
    const barberContract = new web3.eth.Contract(
      barberABI as any,
      barber_address
    );
    let getScore;
    try {
      getScore =
        (await barberContract.methods.getCurrentScore().call()) / 10 ** 18;
      setBarberScore({ business: "Barber", score: getScore });
    } catch (err: any) {
      console.log("barberScore: ", err);
    }
  }
  async function getGroceryScore() {
    const groceryContract = new web3.eth.Contract(
      groceryABI as any,
      grocery_address
    );
    let getScore;
    try {
      getScore =
        (await groceryContract.methods.getCurrentScore().call()) / 10 ** 18;
      setGroceryScore({ business: "Grocery", score: getScore });
    } catch (err: any) {
      console.log("groceryScore: ", err);
    }
  }
  async function getDinerScore() {
    const dinerContract = new web3.eth.Contract(dinerABI as any, diner_address);
    let getScore;
    try {
      getScore =
        (await dinerContract.methods.getCurrentScore().call()) / 10 ** 18;
      setDinerScore({ business: "Diner", score: getScore });
    } catch (err: any) {
      console.log("dinerScore: ", err);
    }
  }

  async function getWalletOwnsNft() {
    const barberContract = new web3.eth.Contract(
      barberABI as any,
      barber_address
    );

    const dinerContract = new web3.eth.Contract(
      dinerABI as any, 
      diner_address);

    const groceryContract = new web3.eth.Contract(
      groceryABI as any,
      grocery_address
    );
    try {
      let barberOwner = await barberContract.methods
        .walletOfOwner(account)
        .call();
      let groceryOwner = await groceryContract.methods
        .walletOfOwner(account)
        .call();
      let dinerOwner = await dinerContract.methods
        .walletOfOwner(account)
        .call();
      console.log(barberOwner);
      console.log(groceryOwner);
      console.log(dinerOwner);
    } catch (err: any) {
      console.log(err);
    }
  }

  async function handleRanking() {
    // await getWalletOwnsNft();
    await getDinerScore();
    await getBarberScore();
    await getGroceryScore();

    let ar = [dinerScore, barberScore, groceryScore];
    ar.sort(function (a, b ):Score {
      if (a.score < b.score) {
        return 1;
      }
      if (a.score > b.score) {
        return -1;
      }

      return 0;
    });
    setRankArray([...ar]);
    return ar;
  }

  const TableContent = () => {
    return (
      <TableContainer className={styles.rankingModal}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Business</TableCell>
              <TableCell align="right">Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rankArray.map((item, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {item.business}
                </TableCell>
                <TableCell align="right">{item.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  useEffect(() => {
    if (account) {
      handleRanking();
    }
  }, [account, rankArray]);

  return (
    <div>
      <Modal
        className={styles.rankingModal}
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container justifyContent="flex-end" alignItems="center">
            <IconButton onClick={handleClose} size="small">
              <CloseIcon />
            </IconButton>
          </Grid>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <TableContent />
        </Box>
      </Modal>
    </div>
  );
};
