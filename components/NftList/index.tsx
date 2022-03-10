import React, {useState, useEffect} from 'react'
import { useWeb3React } from '@web3-react/core'
import Stack from '@mui/material/Stack';

const renderList = [

]

async function getMintedNfts(){
  const 
}

useEffect(() => {
  if(typeof window.ethereum !== 'undefined'){

  }
})


export default function NftList({ renderList, account }: any) {
  return (
    <div>
      <Stack direction="row">
        {account ? renderList.map(
          (item: any) => {
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
