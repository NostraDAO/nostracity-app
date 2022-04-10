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

export async function getBarberRemain() {
  let remainBarberValue,
    totalBarberSupply,
    maxBarberSupply,
    maxBarberSupplyReq,
    totalBarberSupplyReq;

  if (window.ethereum !== "undefined") {
    maxBarberSupplyReq = await barberContract.methods.MAX_SUPPLY.call().call();
    maxBarberSupply = maxBarberSupplyReq;
    totalBarberSupplyReq = await barberContract.methods.totalSupply().call();
    totalBarberSupply = totalBarberSupplyReq;
    remainBarberValue = maxBarberSupply - totalBarberSupply;
    return remainBarberValue;
  }
}

export async function getGroceryRemain() {
  let remainGroceryValue,
    totalGrocerySupply,
    maxGrocerySupply,
    maxGrocerySupplyReq,
    totalGrocerySupplyReq;

  if (window.ethereum !== "undefined") {
    maxGrocerySupplyReq = await groceryContract.methods.MAX_SUPPLY.call().call();
    maxGrocerySupply = maxGrocerySupplyReq;
    totalGrocerySupplyReq = await groceryContract.methods.totalSupply().call();
    totalGrocerySupply = totalGrocerySupplyReq;
    remainGroceryValue = maxGrocerySupply - totalGrocerySupply;
    return remainGroceryValue;
  }
}

export async function getDinerRemain() {
  let remainDinerValue, totalDinerSupply, maxDinerSupplyReq, maxDinerSupply, totalDinerSupplyReq;

  if (window.ethereum !== "undefined") {
    maxDinerSupplyReq = await dinerContract.methods.MAX_SUPPLY.call().call();
    maxDinerSupply = maxDinerSupplyReq;
    totalDinerSupplyReq = await dinerContract.methods.totalSupply().call();
    totalDinerSupply = totalDinerSupplyReq;
    remainDinerValue = maxDinerSupply - totalDinerSupply;
    return remainDinerValue;
  }
}
