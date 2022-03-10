import React from 'react'
import { useWeb3React } from '@web3-react/core'
import Stack from '@mui/material/Stack';

const renderList = [

]



export default function NftList({ renderList, account }: any) {
  return (
    <div>
      <Stack direction="row">
        {account ? renderList.map(
          (item) => {
            <>
              <div>
                <div>Tomato</div>
                <div>200</div>
              </div>
              <div>
                <div>Scissor</div>
                <div>200</div>
              </div>
              <div>
                <div>Coffee</div>
                <div>200</div>
              </div>
            </>
          }
        ): 'Account not connected!'}

      </Stack>
    </div >
  )
}
