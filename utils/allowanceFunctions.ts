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
declare const window: any;

const web3 = new Web3(Web3.givenProvider);

const daiContract = new web3.eth.Contract(
    daiContractAbi as any,
    dai_address
  );
    export async function getBarberAllowance(account : string){
        try{
            return  (await daiContract.methods
                .allowance(account, barber_address)
                .call()) /
              10 ** 18;
        }catch(err: any){
            console.log(err);
        }
    }

    export async function getGroceryAllowance(account: string){
        try{
            return  (await daiContract.methods
                .allowance(account, grocery_address)
                .call()) /
              10 ** 18;
        }catch(err: any){
            console.log(err);
        }
    }

    export async function getDinerAllowance(account: string){
        try{
            return  (await daiContract.methods
                .allowance(account, diner_address)
                .call()) /
              10 ** 18;
        }catch(err: any){
            console.log(err);
        }
    }
