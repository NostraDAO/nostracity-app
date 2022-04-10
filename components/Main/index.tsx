import React from 'react'
import Image from 'next/image'
import Sidebar from '../Sidebar'
import Container from '@material-ui/core/Container'
import ProfileWallet from '../ProfileWallet'
import styles from './Main.module.css'
import MapPins from '../MapPins'
import Background from '../Background'
import ConnectProvider from "../../context/ConnectContext"
import NftsProvider from "../../context/NftsContext"
export default function Main() {

  return (
    <div className={styles.mainRoot}>
      <Sidebar />
      <ConnectProvider>
      <ProfileWallet />
      <NftsProvider>
      <MapPins />
      </NftsProvider>
      </ConnectProvider>
     <Background />
    </div>
  )
}
