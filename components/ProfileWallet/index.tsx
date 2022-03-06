import React from 'react'
import UserLineIcon from 'remixicon-react/UserLineIcon'
import styles from './ProfileWallet.module.css'
import Button from '@material-ui/core/Button'
export default function ProfileWallet() {
  return (
    <div className={styles.profile}>
      <div className={styles.profileBox}>
        <UserLineIcon color="black" size="36px" />
        <Button variant="contained" color="primary">
          Connect Your Wallet
        </Button>
        </div>
    </div>
  )
}
