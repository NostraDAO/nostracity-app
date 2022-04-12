import React from 'react'
import Button from "@mui/material/Button"
import addToken from "../../utils/addTokenFunction"


export default function AddTokenButton() {
  return (
    <Button onClick={() => addToken()}>
        Add $BOSS Token
    </Button>
  )
}
