import Web3 from "web3";
import barberContractAbi from "../abi/BarberShopNFT.json";
import groceryContractAbi from "../abi/GroceryStoreNFT.json";
import dinerContractAbi from "../abi/DinerNFT.json";
import daiContractAbi from "../abi/DAIE.json";

import {
  dai_address,
  diner_address,
  grocery_address,
  barber_address,
} from "../constants/adresses/contracts";

const web3 = new Web3(Web3.givenProvider);

const daiContract = new web3.eth.Contract(
    daiContractAbi as any,
    dai_address
  );

const barberContract = new web3.eth.Contract(
    barberContractAbi as any,
    barber_address
  );
  const groceryContract = new web3.eth.Contract(
    groceryContractAbi as any,
    grocery_address
  );
  const dinerContract = new web3.eth.Contract(
      dinerContractAbi as any, 
      diner_address);

      export async function getBarberPrice(account){
        try{
            return (await barberContract.methods.getMintingPrice(account).call()) /
            10 ** 18;
        }catch(error: any){
            console.log(error);
        }
      }

      export async function getGroceryPrice(account){
        try{
            return (await groceryContract.methods.getMintingPrice(account).call()) /
            10 ** 18;
        }catch(error: any){
            console.log(error);
        }
    }

    export async function getDinerPrice(account){
        try{
            return (await barberContract.methods.getMintingPrice(account).call()) /
            10 ** 18;
        }catch(error: any){
            console.log(error);
        }
    }
