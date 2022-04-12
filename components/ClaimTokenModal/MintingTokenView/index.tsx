import React, { useState, useEffect }from 'react'
import Web3 from 'web3'
import { useWeb3React } from "@web3-react/core";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styles from './MintingTokenView.module.css'
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@material-ui/core/Grid";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import LoadingButton from '@mui/lab/LoadingButton';
import SuccessMintTokenView from "../SuccessMintTokenView"
import ErrorMintTokenView from "../ErrorMintTokenView"


export default function MintingTokenView({isLoading, IsSuccess, IsError } : any ) {
const web3 = new Web3(Web3.givenProvider);
return (
    <div>
      <div
        className={styles.ClaimTokenModal}
      >
        <Box>
          {isLoading ? (
            <>
            <Stack direction="row" spacing={2} sx={{ justifyContent: "center", alignItems: "center"}}>
            <div>Minting your: XXX $BOSS Tokens</div>
            
            </Stack>  
            <LoadingButton
            loadingPosition="center"
          size="medium"
          loading={isLoading}
          variant="outlined"
          disabled
        >Claim $BOSS </LoadingButton>
            </>
          ): null}
         
        </Box>
      </div>
    </div>
  )
}
