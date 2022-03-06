import React from 'react'
import Image from 'next/image'
import Map from '../../public/assets/images/nostracity_map.svg'
import Sidebar from '../Sidebar'
import Container from '@material-ui/core/Container'
import ProfileWallet from '../ProfileWallet'
import styles from './Main.module.css'
import MapPins from '../MapPins'

export default function Main() {

  return (
    <div>
      <Sidebar />
      <ProfileWallet />
      <MapPins />
      <Image src ={Map} objectFit="cover"  layout="fill"   />
    </div>
  )
}
