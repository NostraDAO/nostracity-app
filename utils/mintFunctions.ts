import Web3 from "web3";
import barberABI from "../abi/BarberShopNFT.json";
import groceryABI from "../abi/GroceryStoreNFT.json";
import dinerABI from "../abi/DinerNFT.json";
import daiContractAbi from "../abi/DAIE.json";
import {
    dai_address,
    barber_address,
    diner_address,
    grocery_address,
  } from "../constants/adresses/contracts";
const web3 = new Web3(Web3.givenProvider);

  const barberContract = new web3.eth.Contract(
    barberABI as any,
    barber_address
  );
interface MintProps { 
    hash: any | undefined;
    receipt: any | undefined;
    error: any | undefined;
}
export async function barberMint(account:any , quantity:number) {
let mintObj: MintProps = {}
 try { barberContract.methods
    .safeMint(quantity)
    .send({ from: account })
    .on("transactionHash", function (hash: any) {
        mintObj.hash = hash;
    })
    .on("receipt", (receipt: any) => {
        mintObj.receipt = receipt;
    })
    .on("error", (err: any) => {
      console.log("err", err);
      mintObj.error = err;  
    });
    } catch (err: any) {
    console.log("err mint", err);
    mintObj.error = err;
    }finally {
        return mintObj;
    }
}
 
