import React from "react";
import styles from "./MapPins.module.css";
import MapPinFillIcon from "remixicon-react/MapPinFillIcon";
import IconButton from "@material-ui/core/IconButton";

export default function MapPins() {
  return (
    <div className={styles.mapPins}>
      <IconButton href="#" color="primary">
        <MapPinFillIcon size="36px" />
      </IconButton>
      <IconButton href="#" color="primary">
        <MapPinFillIcon size="36px" />
      </IconButton>
      <IconButton href="#" color="primary">
        <MapPinFillIcon size="36px" />
      </IconButton>
    </div>
  );
}
