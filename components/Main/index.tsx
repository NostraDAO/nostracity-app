import React from 'react'
import Image from 'next/image'
import Sidebar from '../Sidebar'
import Container from '@material-ui/core/Container'
import ProfileWallet from '../ProfileWallet'
import styles from './Main.module.css'
import MapPins from '../MapPins'
import Background from '../Background'
export default function Main() {

  return (
    <div>
      <Sidebar />
      <ProfileWallet />
      <MapPins />
     <Background />
    </div>
  )
}
