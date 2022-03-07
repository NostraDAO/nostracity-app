import React from "react";
import styles from "./MapPins.module.css";
import PushPin2FillIcon from "remixicon-react/PushPin2FillIcon";
import BankFillIcon from "remixicon-react/BankFillIcon";

import IconButton from "@material-ui/core/IconButton";

export default function MapPins() {
  return (
    <div className={styles.mapPins}>
      <IconButton href="#" color="primary" name="barber">
        <PushPin2FillIcon size="36px" />
      </IconButton>
      <IconButton href="#" color="primary" name="grocery">
        <PushPin2FillIcon size="36px" />
      </IconButton>
      <IconButton href="#" color="primary" name="diner">
        <PushPin2FillIcon size="36px" />
      </IconButton>
      
      <IconButton href="#" color="primary" name="bank">
        <BankFillIcon size="36px" />
      </IconButton>
    </div>
  );
}
