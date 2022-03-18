import React, { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import barberABI from "../../abi/BarberShopNFT.json";
import groceryABI from "../../abi/GroceryStoreNFT.json";
import dinerABI from "../../abi/DinerNFT.json";
import {barber_address, diner_address, grocery_address} from '../../constants/adresses/contracts'





export default function NftList({ account }: any) {
  const web3 = new Web3(Web3.givenProvider);

  const [scissors, setScissors] = useState(0);
  const [tomatoes, setTomatoes] = useState(0);
  const [coffee, setCoffee] = useState(0);

  async function renderCoffee() {
    const dinerContract = new web3.eth.Contract(
      dinerABI as any,
      diner_address
    );
    let nftCounter = await dinerContract.methods.walletOfOwner(account).call();
    console.log("", nftCounter);
    nftCounter.length >= 1 ? setCoffee(nftCounter.length) : setCoffee(0);
  }

  async function renderTomatoes() {
    const groceryContract = new web3.eth.Contract(
      groceryABI as any,
      grocery_address
    );
    let nftCounter = await groceryContract.methods.walletOfOwner(account).call();
    console.log("", nftCounter);
    nftCounter.length >= 1 ? setTomatoes(nftCounter.length) : setTomatoes(0);
  }
  
  async function renderScissors() {
    const barberContract = new web3.eth.Contract(
      barberABI as any,
      barber_address
    );
    let nftCounter = await barberContract.methods.walletOfOwner(account).call();
    console.log("", nftCounter);
    nftCounter.length >= 1 ? setScissors(nftCounter.length) : setScissors(0);
  }
  
  useEffect(() => {
    if(account){
      renderScissors();
      renderTomatoes();
      renderCoffee();
    }
    
  },[scissors, coffee, tomatoes]);

  return (
    <Container fixed>
    <Box>
      <Stack direction="row" spacing={2} sx={{justifyContent: 'center'}} >
        {account ? (
          <>
            <div>
              <div>Tomato</div>
              <div>{tomatoes}</div>
            </div>
            <div>
              <div>Scissor</div>
              <div>{scissors}</div>
            </div>
            <div>
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
