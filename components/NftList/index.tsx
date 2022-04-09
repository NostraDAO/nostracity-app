import React, { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import barberABI from "../../abi/BarberShopNFT.json";
import groceryABI from "../../abi/GroceryStoreNFT.json";
import dinerABI from "../../abi/DinerNFT.json";
import {
  barber_address,
  diner_address,
  grocery_address,
} from "../../constants/adresses/contracts";
import {useNftsContext} from "../../context/NftsContext"


import coffeeImage from '../../public/assets/images/coffee.png'
import tomatoImage from '../../public/assets/images/tomato.png'
import scissorImage from '../../public/assets/images/scissors.png'

export default function NftList({ account }: any) {
const web3 = new Web3(Web3.givenProvider);
const {tomatoes, coffee, scissors} = useNftsContext();
  return (
    <Container fixed>
      <Box>
        <Stack direction="row" spacing={2} sx={{ justifyContent: "center", alignItems: "center"}}>
          {account ? (
            <>
              <div style={{height: "150px"}}>
                <div><img src={tomatoImage.src} alt="tomato" width="100px" height="108px" /></div>
                <div>Tomato</div>
                <div>{tomatoes}</div>
              </div>
              <div style={{height: "150px"}}>
              <div><img src={scissorImage.src} alt="scissors" width="100px" height="108px" /></div>
                <div>Scissor</div>
                <div>{scissors}</div>
              </div>
              <div style={{height: "150px"}}>
              <div><img src={coffeeImage.src} alt="tomato" width="100px" height="108px" /></div>
                <div>Coffee</div>
                <div>{coffee}</div>
              </div>
            </>
          ) : (
            "Account not connected!"
          )}
        </Stack>
      </Box>
    </Container>
  );
}
