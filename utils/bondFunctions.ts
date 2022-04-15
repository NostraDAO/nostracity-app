import Web3 from "web3";
import { dai_address } from "../constants/adresses/contracts";
import daiContractAbi from "../abi/DAIE.json";

declare var window: any;
const web3 = new Web3(Web3.givenProvider);

const daiContract = new web3.eth.Contract(
  daiContractAbi as any,
  dai_address
);
export async function approveBondDai(account: string, quantity: number): Promise<any>{
    let approveTx;
    try {
        approveTx = daiContract.methods
            .approve(barber_address, weiBarber)
            .send({ from: acc })
    }catch(error: any){
        console.log(error);
    }
}