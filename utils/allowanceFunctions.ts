import Web3 from "web3";
import daiContractAbi from "../abi/DAIE.json";
import {
    dai_address,
    barber_address,
    diner_address,
    grocery_address,
  } from "../constants/adresses/contracts";
const web3 = new Web3(Web3.givenProvider);

const daiContract = new web3.eth.Contract(
    daiContractAbi as any,
    dai_address
  );

export async function barberAllowance(account){
   try{
    return  (await daiContract.methods
        .allowance(account, barber_address)
        .call()) /
      10 ** 18;
   }catch(err: any){
       console.log(err);
   }
}

export async function groceryAllowance(account){
    try{
     return  (await daiContract.methods
         .allowance(account, grocery_address)
         .call()) /
       10 ** 18;
    }catch(err: any){
        console.log(err);
    }
 }

 export async function dinerAllowance(account){
    try{
     return  (await daiContract.methods
         .allowance(account, diner_address)
         .call()) /
       10 ** 18;
    }catch(err: any){
        console.log(err);
    }
 }