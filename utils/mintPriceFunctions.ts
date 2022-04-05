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

export async function  barberMintPrice(account){
    const barberContract = new web3.eth.Contract(
        barberABI as any,
        barber_address
      );
      let mintPrice;
    try {
        return mintPrice = (await barberContract.methods.getMintingPrice(account).call()) /
        10 ** 18;
        }catch(err: any){
            console.log(err);
        }
}

export async function  groceryMintPrice(account){
    const groceryContract = new web3.eth.Contract(
        groceryABI as any,
        grocery_address
      );
      let mintPrice;
    try {
        return mintPrice = (await groceryContract.methods.getMintingPrice(account).call()) /
        10 ** 18;
        }catch(err: any){
            console.log(err);
        }
}

export async function  dinerMintPrice(account){
    const dinerContract = new web3.eth.Contract(
        dinerABI as any,
        diner_address
      );
      let mintPrice;
    try {
        return mintPrice = (await dinerContract.methods.getMintingPrice(account).call()) /
        10 ** 18;
        }catch(err: any){
            console.log(err);
        }
}