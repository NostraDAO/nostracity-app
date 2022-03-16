import Web3 from "web3";
import daiContractAbi from "../abi/DAIE.json";
import barberContractAbi from "../abi/BarberShopNFT.json";
import groceryContractAbi from "../abi/GroceryStoreNFT.json";
import dinerContractAbi from "../abi/DinerNFT.json";
import {
  diner_address,
  grocery_address,
  barber_address,
  dai_address,
} from "../constants/adresses/contracts";


export async function getBarberLimit() {
  const web3 = new Web3(Web3.givenProvider);

  const ethEnabled =  () => {
      let account;
    if (window.ethereum !== 'undefined') {
      account =  window.ethereum.selectedAddress;
  };
  return account;
  }
  let account = ethEnabled();
  let barberLimit;
  const barberContract = new web3.eth.Contract(
    barberContractAbi as any,
    barber_address
  );
  try{
    barberLimit = await barberContract.methods.getMintingLimit(account).call();

  }
  catch(e : any){
      console.log(e);
  }finally{
  return barberLimit;

  }

}

export async function getGroceryLimit() {
    const web3 = new Web3(Web3.givenProvider);
  
    const ethEnabled =  () => {
        let account;
      if (window.ethereum !== 'undefined') {
        account =  window.ethereum.selectedAddress;
    };
    return account;
    }
    let account = ethEnabled();
    let groceryLimit;
    const groceryContract = new web3.eth.Contract(
      groceryContractAbi as any,
      grocery_address
    );
    try{
      groceryLimit = await groceryContract.methods.getMintingLimit(account).call();
  
    }
    catch(e : any){
        console.log(e);
    }finally{
    return groceryLimit;
  
    }
  
  }

  export async function getDinerLimit() {
    const web3 = new Web3(Web3.givenProvider);
  
    const ethEnabled =  () => {
        let account;
      if (window.ethereum !== 'undefined') {
        account =  window.ethereum.selectedAddress;
    };
    return account;
    }
    let account = ethEnabled();
    let dinerLimit;
    const dinerContract = new web3.eth.Contract(
      dinerContractAbi as any,
      diner_address
    );
    try{
      dinerLimit = await dinerContract.methods.getMintingLimit(account).call();
  
    }
    catch(e : any){
        console.log(e);
    }finally{
    return dinerLimit;
  
    }
  
  }