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

      export async function countCoffee(account) {
    const nftCounter = await dinerContract.methods.walletOfOwner(account).call();
    return nftCounter.length > 0 ? nftCounter.length : 0;
  }

  export async function countTomatoes(account) {
    const nftCounter = await groceryContract.methods
      .walletOfOwner(account)
      .call();
    return nftCounter.length > 0 ? nftCounter.length : 0;
  }

  export async function countScissors(account) {
    const nftCounter = await barberContract.methods.walletOfOwner(account).call();
    return nftCounter.length > 0 ? nftCounter.length : 0;
  }