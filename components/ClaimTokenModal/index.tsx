import React, { useState, useEffect }from 'react'
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
import {renderScissors, renderTomatoes, renderCoffee} from "../../utils/nftCounterFunctions";
//Images
import coffeeImage from '../../public/assets/images/coffee.png'
import tomatoImage from '../../public/assets/images/tomato.png'
import scissorImage from '../../public/assets/images/scissors.png'

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
export default function ClaimTokenModal({
    isOpen,
    handleClose,

}: any) {
const { account, active } = useWeb3React();
const [scissors, setScissors] = useState(0);
const [tomatoes, setTomatoes] = useState(0);
const [coffee, setCoffee] = useState(0);

useEffect(() => {
    if (account) {
      renderScissors(account).then((scissors) => setScissors(scissors));
      renderTomatoes(account).then((tomatoes) => setTomatoes(tomatoes));
      renderCoffee(account).then((coffee) => setCoffee(coffee));
    }
  }, [scissors, coffee, tomatoes]);
  
  return (
    <div>
      <Modal
        className={styles.ClaimTokenModal}
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
            Claim your Tokens
          </Typography>
          <Stack direction="row" spacing={2} sx={{ justifyContent: "center", alignItems: "center"}}>
          {account ? (
            <>
              <div style={{height: "150px"}}>
                <div><img src={tomatoImage.src} alt="tomato" width="100px" height="108px" /></div>
                <div>Tomato</div>
                <div>{tomatoes}</div>
              </div>
              <div style={{height: "150px"}}>
              <div><img src={scissorImage.src} alt="scissors" width="100px" height="108px" /></div>
                <div>Scissor</div>
                <div>{scissors}</div>
              </div>
              <div style={{height: "150px"}}>
              <div><img src={coffeeImage.src} alt="tomato" width="100px" height="108px" /></div>
                <div>Coffee</div>
                <div>{coffee}</div>
              </div>
            </>
          ) : (
            "Account not connected!"
          )}
        </Stack>
           
        </Box>
      </Modal>
    </div>
  )
}
