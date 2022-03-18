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

import {
  barber_address,
  grocery_address,
  diner_address,
} from "../../constants/adresses/contracts";
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

interface Score {
  business: string;
  score: number;
}

interface Scores extends Array<Score> {}

export const RankingModal = ({ isOpen, handleClose, title }: any) => {
  const web3 = new Web3(Web3.givenProvider);
  const { account } = useWeb3React();
  const [barberScore, setBarberScore] = useState<Score>();
  const [groceryScore, setGroceryScore] = useState<Score>();
  const [dinerScore, setDinerScore] = useState<Score>();
  const [rankArray, setRankArray] = useState<Scores>([]);
  const [barberOwner, setBarberOwner] = useState<Array>();
  const [groceryOwner, setGroceryOwner] = useState<Array>();
  const [dinerOwner, setDinerOwner] = useState<Array>();
  const [ownsNft, setOwnsNft] = useState<boolean>(false);

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

  async function getOwnedBarber() {
    const barberContract = new web3.eth.Contract(
      barberABI as any,
      barber_address
    );

    try {
      setBarberOwner(
        await barberContract.methods.walletOfOwner(account).call());
        barberOwner.length > 0 ? setOwnsNft(true) : false;
    } catch (e: any) {
      console.log(e);
    }
  }

  async function getOwnedDiner() {
    const dinerContract = new web3.eth.Contract(dinerABI as any, diner_address);

    try {
      setDinerOwner(await dinerContract.methods.walletOfOwner(account).call());
      dinerOwner.length > 0 ? setOwnsNft(true) : false;

    } catch (e: any) {
      console.log(e);
    }
  }

  async function getOwnedGrocery() {
    const groceryContract = new web3.eth.Contract(
      groceryABI as any,
      grocery_address
    );

    try {
      setGroceryOwner(
        await groceryContract.methods.walletOfOwner(account).call()
      );
      groceryOwner.length > 0 ? setOwnsNft(true) : false;
    } catch (err: any) {
      console.log(err);
    }
  }

  async function getOwnedNfts(){
    await getOwnedBarber();
    await getOwnedDiner();
    await getOwnedGrocery();
  }

  async function getListScored(){
    let ar: Score[] = [];
    if (dinerScore && barberScore && groceryScore) {
      ar = [dinerScore, barberScore, groceryScore];
      ar.sort((a, b) => b.score - a.score);
      setRankArray([...ar]);

    }
  }
  async function handleRanking() {
    if (account) {
      await getOwnedNfts();
      await getDinerScore();
      await getBarberScore();
      await getGroceryScore();
      await getListScored();
      
    }
   
    
      
  
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
            {ownsNft ? (
              rankArray.map((item, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {item.business}
                  </TableCell>
                  <TableCell align="right">{item.score}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell component="th" scope="row"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  useEffect(() => {
    let active = true;
    if (typeof window.ethereum !== "undefined") {
      handleRanking();
    }
    return () => {
      active = false;
    };
  },[]);

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
