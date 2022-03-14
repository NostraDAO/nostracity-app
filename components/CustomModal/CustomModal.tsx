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
  bgcolor: "#F3DFC1",
  boxShadow: 24,
  p: 4,
  fontFamily: "OldNewspaperTypes"
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
  isDisabled
} :any) => {
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
          <Typography align="center"  variant="h2" component="h2">
            {title}
          </Typography>
          <Box id="modal-modal-description" sx={{ mt: 2 }}>
            {children}
          </Box>          
            <Button variant="outlined" onClick={handleMint} disabled={isDisabled}>
              {buttonText} {nftName}
            </Button>
        </Box>
      </Modal>
    </div>
  );
};
