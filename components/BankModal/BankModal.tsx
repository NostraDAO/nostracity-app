import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styles from "./BankModal.module.css";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@material-ui/core/Grid";
import IconButton from "@mui/material/IconButton";
import {useConnectContext} from "../../context/ConnectContext"
import {useBankContext} from "../../context/BankContext"

declare let window: any;

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
  const [tvl, setTvl] = useState<number>(0);
  const {chain, account } = useConnectContext();
  const {barberScore, dinerScore, groceryScore} = useBankContext()

  function getScoreSum() {
    const  totalScore = barberScore + dinerScore + groceryScore;
      return totalScore;
  }

  useEffect(() => {
    let active = true;
    if ((typeof window.ethereum !== "undefined" && active) && chain == 43114 || chain == 43113) {
      account
        ? setTvl(getScoreSum())
        : "Wallet not connected!";
    }
    console.log('tvl', tvl)
    return () => {
      active = false;
    };
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
