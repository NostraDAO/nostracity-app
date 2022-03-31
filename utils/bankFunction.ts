import Web3 from "web3";
import treasuryABI from "../abi/Treasury.json";
import { treasury_address } from "../constants/adresses/contracts";
declare var window: any;
const web3 = new Web3(Web3.givenProvider);

async function getChainId() {
  let chainId = await web3.eth.getChainId();
  return chainId;
}

export async function getTVL() {
  const chainId = await getChainId();
  if (chainId == 43114) {
    const treasuryContract = new web3.eth.Contract(
      treasuryABI as any,
      treasury_address
    );
    let treasuryBalance;
    try {
      treasuryBalance = await treasuryContract.methods
        .getTotalTreasuryValue()
        .call();
    } catch (err: any) {
      console.log("getTVL error: ", err);
    } finally {
      return treasuryBalance;
    }
  }
}
