import Web3 from "web3";
import barberABI from "../abi/BarberShopNFT.json";
import groceryABI from "../abi/GroceryStoreNFT.json";
import dinerABI from "../abi/DinerNFT.json";
import {
  barber_address,
  diner_address,
  grocery_address,
} from "../constants/adresses/contracts";

const web3 = new Web3(Web3.givenProvider);


export async function renderCoffee(account) {
    const dinerContract = new web3.eth.Contract(dinerABI as any, diner_address);
    let nftCounter = await dinerContract.methods.walletOfOwner(account).call();
    return nftCounter.length >= 1 ? nftCounter.length : 0;
  }

  export async function renderTomatoes(account) {
    const groceryContract = new web3.eth.Contract(
      groceryABI as any,
      grocery_address
    );
    let nftCounter = await groceryContract.methods
      .walletOfOwner(account)
      .call();
    return nftCounter.length >= 1 ? nftCounter.length : 0;
  }

  export async function renderScissors(account) {
    const barberContract = new web3.eth.Contract(
      barberABI as any,
      barber_address
    );
    let nftCounter = await barberContract.methods.walletOfOwner(account).call();
    return nftCounter.length >= 1 ? nftCounter.length : 0;
  }