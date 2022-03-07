import React, {useState} from "react";
import styles from "./MapPins.module.css";
import PushPin2FillIcon from "remixicon-react/Pushpin2FillIcon";
import BankFillIcon from "remixicon-react/BankFillIcon";

import IconButton from "@material-ui/core/IconButton";
import {CustomModal} from "../CustomModal/CustomModal";

export default function MapPins() {
const [isOpen, setIsOpen] = useState(false);

const handleOpen = () => {
  setIsOpen(true);
}

const handleClose = () => {
  setIsOpen(false);
}
  const barberMint = ()=>{

  }

  const groceryMint = ()=>{

  }

  const dinerMint = ()=>{

  }



  return (
    <map className={styles.mapPins} name="workmap">
      <IconButton onClick={handleOpen} color="primary" name="barber">
        <PushPin2FillIcon size="36px" />
      </IconButton>
      <CustomModal isOpen={isOpen} handleClose={handleClose} title='Mint for the Barbershop' handleMint={barberMint} nftName="Scissors">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, cupiditate.
      </CustomModal>

      <IconButton onClick={handleOpen}color="primary" name="grocery">
        <PushPin2FillIcon size="36px" />
      </IconButton>

      <CustomModal isOpen={isOpen} handleClose={handleClose} title="Mint for the Grocery Store" handleMint={groceryMint} nftName="Tomatoes">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, cupiditate.
      </CustomModal>

      <IconButton onClick={handleOpen} color="primary" name="diner">
        <PushPin2FillIcon size="36px" />
      </IconButton>


      <CustomModal isOpen={isOpen} handleClose={handleClose} title="Mint for the Diner" handleMint={dinerMint} nftName="Coffee">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, cupiditate.
      </CustomModal>
      <IconButton onClick={handleOpen} color="primary" name="bank">
        <BankFillIcon size="36px" />
      </IconButton>
      
    </map>
  );
}
