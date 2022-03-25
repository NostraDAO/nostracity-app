import Web3 from "web3";
import treasuryABI from "../abi/Treasury.json"
import { treasury_address } from "../constants/adresses/contracts";
declare var window: any;


export async function getTVL() {
    const web3 = new Web3(Web3.givenProvider);
    const treasuryContract = new web3.eth.Contract(
      treasuryABI as any,
      treasury_address
    );
    let treasuryBalance;
    try {
      treasuryBalance = await treasuryContract.methods.getTotalTreasuryValue().call()
    } catch (err: any) {
      console.log("getTVL error: ", err);
    } finally {
      return treasuryBalance;
    }
  }