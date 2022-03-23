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

import {
  barber_address,
  grocery_address,
  diner_address,
} from "../../constants/adresses/contracts";
import styles from "./RankingModal.module.css";

import {
  getBarberScore,
  getGroceryScore,
  getDinerScore,
  getOwnedBarber,
  getOwnedGrocery,
  getOwnedDiner,
} from "../../utils/nftScoresFunctions.ts";

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
declare var window: any;

export const RankingModal = ({ isOpen, handleClose, title }: any) => {
  const web3 = new Web3(Web3.givenProvider);
  const { account } = useWeb3React();
  const [barberScore, setBarberScore] = useState<Score>();
  const [groceryScore, setGroceryScore] = useState<Score>();
  const [dinerScore, setDinerScore] = useState<Score>();
  const [rankArray, setRankArray] = useState<Scores>([]);
  const [barberOwner, setBarberOwner] = useState<any[]>([]);
  const [groceryOwner, setGroceryOwner] = useState<any[]>([]);
  const [dinerOwner, setDinerOwner] = useState<any[]>([]);
  const [ownsNft, setOwnsNft] = useState<boolean>(false);

  async function getOwnedNfts() {
    setBarberOwner(await getOwnedBarber(account));
    setDinerOwner(await getOwnedDiner(account));
    setGroceryOwner(await getOwnedGrocery(account));
    getCheckedNft();
    getListScored();
  }

  function getCheckedNft() {
    if (
      barberOwner?.length > 0 ||
      groceryOwner?.length > 0 ||
      dinerOwner?.length > 0
    ) {
      setOwnsNft(true);
    } else {
      setOwnsNft(false);
    }
  }

  function getListScored() {
    let ar: Score[] = [];
    if (dinerScore && barberScore && groceryScore) {
      ar = [dinerScore, barberScore, groceryScore];
      ar.sort((a, b) => b.score - a.score);
      setRankArray([...ar]);
    }
  }
  async function handleRanking() {
      await getOwnedNfts();
      setDinerScore(await getDinerScore());
      setBarberScore(await getBarberScore());
      setGroceryScore(await getGroceryScore());
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
    if (typeof window.ethereum !== "undefined" && active) {
      account ? handleRanking(): 'Wallet not connected';
    }
    return () => {
      active = false;
    };
  }, [account]);

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
