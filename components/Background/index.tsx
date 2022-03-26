import React from 'react'
import styles from "./Background.module.css"
import PushPin2FillIcon from "remixicon-react/Pushpin2FillIcon";
import newBackground from "../../public/assets/images/new_background.png"


export default function Background() {
  return (
<div className={styles.containerImg}>
    <img src={newBackground.src} alt="" />
</div>
 
  
  )
}
