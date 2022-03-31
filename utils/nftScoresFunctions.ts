import Web3 from "web3";

import barberABI from "../abi/BarberShopNFT.json";
import groceryABI from "../abi/GroceryStoreNFT.json";
import dinerABI from "../abi/DinerNFT.json";

import {
  barber_address,
  grocery_address,
  diner_address,
} from "../constants/adresses/contracts";

const web3 = new Web3(Web3.givenProvider);

async function getChainId(){
 let  chainId = await web3.eth.getChainId();
  return chainId;
}
export async function getBarberScore() {
  const chainId = await getChainId();
  if(chainId == 43114) {
    const barberContract = new web3.eth.Contract(
      barberABI as any,
      barber_address
    );
    let getScore, scoreObj;
    try {
      getScore =
        (await barberContract.methods.getCurrentScore().call()) / 10 ** 18;
      scoreObj = { business: "Barber", score: await getScore };
  
    } catch (err: any) {
      console.log("barberScore: ", err);
    } finally {
      return scoreObj;
    }
  }
  
}
export async function getGroceryScore() {
  const chainId = await getChainId();
  if(chainId == 43114){
    const groceryContract = new web3.eth.Contract(
      groceryABI as any,
      grocery_address
    );
    let getScore,  scoreObj;
    try {
      getScore =
        (await groceryContract.methods.getCurrentScore().call()) / 10 ** 18;
      scoreObj = { business: "Grocery", score: await getScore };
    } catch (err: any) {
      console.log("groceryScore: ", err);
    } finally {
      return scoreObj;
    }
  }
  
}
export async function getDinerScore() {
  const chainId = await getChainId();
  if(chainId == 43114){
    const dinerContract = new web3.eth.Contract(dinerABI as any, diner_address);
    let getScore, scoreObj;
    try {
      getScore =
        (await dinerContract.methods.getCurrentScore().call()) / 10 ** 18;
      scoreObj = { business: "Diner", score: await getScore };
    } catch (err: any) {
      console.log("dinerScore: ", err);
    } finally {
      return scoreObj;
    }
  }
  
}

export async function getOwnedBarber(account) {
  const chainId = await getChainId();
  if(chainId == 43114){
    const barberContract = new web3.eth.Contract(
      barberABI as any,
      barber_address
    );
    let nftOwned;
    let res;
    try {
      nftOwned = await barberContract.methods.walletOfOwner(account).call();
      res = await nftOwned;
    } catch (e: any) {
      console.log(e);
    } finally {
      return res;
    }
  }
  
}

export async function getOwnedDiner(account) {
  const chainId = await getChainId();
  if(chainId == 43114){
    const dinerContract = new web3.eth.Contract(dinerABI as any, diner_address);
    let nftOwned;
    let res;
    try {
      nftOwned = await dinerContract.methods.walletOfOwner(account).call();
      res = await nftOwned;
    } catch (e: any) {
      console.log(e);
    } finally {
      return res;
    }
  }
  
}

export async function getOwnedGrocery(account) {
  const chainId = await getChainId();
  if(chainId == 43114){
    const groceryContract = new web3.eth.Contract(
      groceryABI as any,
      grocery_address
    );
    let nftOwned;
    let res;
    try {
      nftOwned = await groceryContract.methods.walletOfOwner(account).call();
      res = await nftOwned;
    } catch (err: any) {
      console.log(err);
    } finally {
      return res;
    }
  }
  
}
