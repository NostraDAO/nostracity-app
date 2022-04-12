import React from 'react'
import Stack from "@mui/material/Stack";
import AddTokenButton from 'components/AddTokenButton';

export default function SuccessMintTokenView() {
  return (
    
    <Stack direction="row" spacing={2} sx={{ justifyContent: "center", alignItems: "center"}}>
    <div style={{height: "150px"}}>
     <p>Success!</p>
     <AddTokenButton/>
    </div>
  </Stack>
  )
}
