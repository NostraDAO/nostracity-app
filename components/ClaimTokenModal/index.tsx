import React, { useState, useEffect }from 'react'
import Web3 from 'web3'
import { useWeb3React } from "@web3-react/core";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styles from './ClaimTokenModal.module.css'
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@material-ui/core/Grid";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import MintingTokenView from "../MintingTokenView"
import {useNftsContext} from "../../context/NftsContext"

import {
  diner_address,
  barber_address,
  grocery_address,
  dai_address,
} from "../../constants/adresses/contracts";
//Images
import coffeeImage from '../../public/assets/images/coffee.png'
import tomatoImage from '../../public/assets/images/tomato.png'
import scissorImage from '../../public/assets/images/scissors.png'
declare const window: any;

const web3 = new Web3(Web3.givenProvider);
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
const {tomatoes, scissors, coffee} = useNftsContext();
const [minting, setMinting] = useState(false);
const [minted, setMinted] = useState(false);
const [notMinted, setNotMinted] = useState(false);
const web3 = new Web3(Web3.givenProvider);

  async function mint(){
    const barberContract = new web3.eth.Contract(
      barberABI as any,
      barber_address
    );

    try {
      let mintTx = barberContract.methods
        .safeMint(barberQuantity)
        .send({ from: account })
        .on("transactionHash", function (hash: any) {
          setBtnTextBarber("Minting...");
          setIsError(false);
          setLockInput(true);
          setIsProcessing(true);
        })
        .on("receipt", (receipt: any) => {
          setBtnTextBarber("Mint");
          setIsError(false);
          setIsProcessing(false);
          setIsSucessful(true);
          setSucessfulMessage("Scissor minted successfully!!");
        })
        .on("error", (err: any) => {
          console.log("err", err);
          setIsError(true);
          setErrorMessage(
            "There was an error on the mint transaction. Check your wallet and try again."
          );
          setLockInput(false);
          setIsProcessing(false);
        });
    }catch(err: any){
      console.log(err);
    }
  }
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
          <>
        <Grid container justifyContent="flex-end" alignItems="center">
            <IconButton onClick={() => {handleClose(); setMinting(false)}}   size="small">
              <CloseIcon />
            </IconButton>
          </Grid>
          <Typography id="modal-modal-title" variant="h2" component="h2">
            Claim your Tokens
          </Typography>
        
          {account ? (
              <>
               {minting == false  ? (
                 <>
              <Stack direction="row" spacing={2} sx={{ justifyContent: "center", alignItems: "center"}}>
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
            </Stack>
            <div style={{marginTop: "24px"}}>Take part of the Family: XXX $BOSS (XXX DAI.e)</div>
            <Button onClick={()=> setMinting(true)}>Claim $BOSS</Button>
           </>
            ) : <MintingTokenView isLoading={minting} isSuccess={minted} isError={notMinted} /> }
           </>
          ) : (
            "Account not connected!"
          )}    
          </>
        </Box>
      </Modal>
    </div>
  )
}
