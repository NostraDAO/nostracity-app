import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Input from "@mui/material/Input";
import styles from "./CustomModal.module.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "80%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export const CustomModal = ({
  isOpen,
  handleClose,
  title,
  children,
  handleMint,
  buttonText,
  nftName,
  isApproved,
}) => {
  return (
    <div>
      <Modal
        className={styles.customModal}
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {children}
          </Typography>          
            <Button variant="outlined" onClick={handleMint}>
              {buttonText} {nftName}
            </Button>
        </Box>
      </Modal>
    </div>
  );
};