import React, {useState, useEffect} from 'react'
import Web3 from 'web3'
import { useWeb3React } from "@web3-react/core";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styles from './NftOwnedModal.module.css'
import NftList from "../NftList"

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "30%",
    height: "30%",
    bgcolor: "background.paper",
    boxShadow: 24,
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
          <Typography id="modal-modal-title" variant="h6" component="h2">
            My NFTs
          </Typography>
           <NftList  account={account}  />
           
        </Box>
      </Modal>
    </div>
  )
}