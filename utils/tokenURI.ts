import Web3 from "web3";
import barberContractAbi from "../abi/BarberShopNFT.json";
import groceryContractAbi from "../abi/GroceryStoreNFT.json";
import dinerContractAbi from "../abi/DinerNFT.json";
import {
  diner_address,
  grocery_address,
  barber_address,
} from "../constants/adresses/contracts";
declare var window: any

const web3 = new Web3(Web3.givenProvider);


export async function getTokenURIBarber(account) {
    const barberContract = new web3.eth.Contract(
        barberContractAbi as any,
        barber_address
      );
        let tokenBarberReq, tokenBarberRes;
      try{
        tokenBarberReq = await barberContract.methods.tokenURI(1).call();
        tokenBarberRes = tokenBarberReq;
        console.log(tokenBarberRes);
        return tokenBarberRes;
      }catch(error: any){
          console.log(error);
      }
}