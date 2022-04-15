import { Button, Stack, Modal, Box, Grid, IconButton, Typography, Input } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import React from 'react'
import styles from "./BondView.module.css"
import { useBond } from "../../context/useBond"


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "50%",
  minHeight: "50%",
  bgcolor: "#F3DFC1",
  boxShadow: 24,
  fontFamily: "OldNewspaperTypes",
  p: 4,
};
interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  lockInput: boolean;
}

export default function BondView({
  isOpen,
  handleClose,
  handleChange,
  lockInput
}: ModalProps) {
import {bondPrice, bossTokens, vestingTime, discountRate } = useBond();
  return (
    <>
    <Modal
        className={styles.BondView}
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Grid container justifyContent="flex-end" alignItems="center">
              <IconButton onClick={() => handleClose() } size="small">
                <CloseIcon />
              </IconButton>
            </Grid>
            <Typography id="modal-modal-title" variant="h2" component="h2">
              Bond $BOSS Tokens with DAI.e
            </Typography>
            <Input
            disabled={lockInput}
            placeholder="How many Tokens"
            type="number"
            onChange={handleChange}
          />
          <p>Bond Price: {bondPrice}</p>
          <p>$BOSS Tokens: {bossTokens}</p>
          <p>Vesting Period: {vestingTime}</p>
          <p>Discount Rate: {discountRate}</p>
          <Button>Approve DAI.e</Button>
        </Box>
      </Modal>
      </>
  )
}
