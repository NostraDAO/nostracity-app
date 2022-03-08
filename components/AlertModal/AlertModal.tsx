import React from "react";
import Alert from "@mui/material/Alert";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "30%",
  height:"30%",
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};
export const  AlertModal = ({
    isOpen,
    handleClose,
}) => {
  return (
    <Modal open={isOpen} handleClose={handleClose}>
      <Alert severity="warning">{children}!</Alert>
    </Modal>
  );
}
