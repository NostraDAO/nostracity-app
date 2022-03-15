import React from 'react'
import styles from "./Background.module.css"


export default function Background() {
  return (
    <div className={styles.containerImg}>
    <img src="/assets/images/nostracity_map.svg" useMap="#workmap" />
    </div>
  )
}
