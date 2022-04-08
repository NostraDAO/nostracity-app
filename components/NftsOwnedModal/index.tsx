import React, {useState, useEffect} from 'react'
import Web3 from 'web3'
import { useWeb3React } from "@web3-react/core";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styles from './NftOwnedModal.module.css'
import NftList from "../NftList"
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@material-ui/core/Grid";
import IconButton from "@mui/material/IconButton";
import ContractsProvider from "../../context/ContractsContext"
import {ContractsType, ContractFunctionsType} from "../../@types/ContractsType"
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: "50%",
    minHeight: "50%",
    bgcolor: "#F3DFC1",
    boxShadow: 24,
    fontFamily : "OldNewspaperTypes",
    p: 4,
  };
const nftlist: any[] = [];
export default function NftOwnedModal({
    isOpen,
    handleClose,

}: any) {
const { account, active } = useWeb3React();

  return (
    <div>
      <Modal
        className={styles.NftModal}
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
          <Typography id="modal-modal-title" variant="h2" component="h2">
            My NFTs
          </Typography>
          <ContractsProvider>
           <NftList  account={account}  />
          </ContractsProvider> 
        </Box>
      </Modal>
    </div>
  )
}
