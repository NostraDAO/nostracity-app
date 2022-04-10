import Web3 from "web3";
import barberContractAbi from "../abi/BarberShopNFT.json";
import groceryContractAbi from "../abi/GroceryStoreNFT.json";
import dinerContractAbi from "../abi/DinerNFT.json";
import {
  diner_address,
  grocery_address,
  barber_address,
} from "../constants/adresses/contracts";
declare var window: any;

const web3 = new Web3(Web3.givenProvider);

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

async function getChainId() {
  let chainId = await web3.eth.getChainId();
  return chainId;
}

export async function getBarberLimit() {
  const chainId = await getChainId();
  const ethEnabled = () => {
    let account;
    if (window.ethereum !== "undefined") {
      account = window.ethereum.selectedAddress;
    }
    return account;
  };
  let account = ethEnabled();
  let barberLimit;
  if (chainId == 43114 || chainId == 43113) {
    try {
      barberLimit = await barberContract.methods
        .getMintingLimit(account)
        .call();
    } catch (e: any) {
      console.log(e);
    } finally {
      return barberLimit;
    }
  }
}

export async function getGroceryLimit() {
  const chainId = await getChainId();
  const ethEnabled = () => {
    let account;
    if (window.ethereum !== "undefined") {
      account = window.ethereum.selectedAddress;
    }
    return account;
  };
  let account = ethEnabled();
  let groceryLimit;
  if (chainId == 43114 || chainId == 43113) {
    try {
      groceryLimit = await groceryContract.methods
        .getMintingLimit(account)
        .call();
    } catch (e: any) {
      console.log(e);
    } finally {
      return groceryLimit;
    }
  }
}

export async function getDinerLimit() {
  const chainId = await getChainId();
  
  const ethEnabled = () => {
    let account;
    if (window.ethereum !== "undefined") {
      account = window.ethereum.selectedAddress;
    }
    return account;
  };
  let account = ethEnabled();
  let dinerLimit;
  if(chainId == 43114 || chainId == 43113){
    try {
      dinerLimit = await dinerContract.methods.getMintingLimit(account).call();
    } catch (e: any) {
      console.log(e);
    } finally {
      return dinerLimit;
    }
  }
  
}
