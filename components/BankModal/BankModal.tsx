import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styles from "./BankModal.module.css";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@material-ui/core/Grid";
import IconButton from "@mui/material/IconButton";
import treasuryABI from "../../abi/Treasury.json";

import { treasury_address } from "../../constants/adresses/contracts";

declare var window: any

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

export const BankModal = ({ isOpen, handleClose, title, children }: any) => {
  const [tvl, setTvl] = useState();
  const { account } = useWeb3React();

  async function getTVL() {
    const web3 = new Web3(Web3.givenProvider);
    const treasuryContract = new web3.eth.Contract(
      treasuryABI as any,
      treasury_address
    );
    console.log('treasuryContract', treasuryContract)
    let treasuryBalance
    try {
      treasuryBalance = await treasuryContract.methods.getTotalTreasuryValue().call()
      console.log('treasuryBalance', treasuryBalance);
    } catch (err: any) {
      console.log("getTVL error: ", err);
    } finally {
      setTvl(treasuryBalance);
    }
  }

  useEffect(() => {
    if(typeof window.ethereum !== "undefined"){
      account ? getTVL() : "Wallet not connected!";
    }
    console.log(tvl);
  }, [account]);

  return (
    <div>
      <Modal
        className={styles.bankModal}
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
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Total Treasury Value : $ {tvl} DAI
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};
