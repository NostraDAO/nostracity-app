import React, { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import barberABI from "../../abi/BarberShopNFT.json";
import groceryABI from "../../abi/GroceryStoreNFT.json";
import dinerABI from "../../abi/DinerNFT.json";

const barber_address = "0x1C26daC2a2e9Bb057fCC061a1903491bA1B5630C";
const grocery_address = "0xDCd4B29BF96ca5Ff1e682D75a76e1BaF3c69DF5d";
const diner_address = "0xee2e93C1E58BD5BC42eE0365401F2C586f4f1694";





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
      <Stack direction="row" spacing={2}>
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
