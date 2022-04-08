import React, {createContext, useEffect, useState, ReactNode, useContext }from 'react';
import {ConntractsType, ContractFunctionType} from  "../@types/ContractsType";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import barberABI from "../abi/BarberShopNFT.json";
import groceryABI from "../abi/GroceryStoreNFT.json";
import dinerABI from "../abi/DinerNFT.json";
import {
  barber_address,
  diner_address,
  grocery_address,
} from "../constants/adresses/contracts";

const defaultContracts: ContractsType = {
    contracts: null,
}
const web3 = new Web3(Web3.givenProvider);


const groceryContract: ContractFunctionsType = new web3.eth.Contract(groceryABI as any, grocery_address);
const barberContract: ContractFunctionsType= new web3.eth.Contract(barberABI as any, barber_address);
const dinerContract: ContractFunctionType = new web3.eth.Contract(dinerABI as any, diner_address);

const ContractsContext = createContext<ContractsType | null>(defaultContracts);

export function useContractsContext(){
return useContext(ContractstContext);
}
const ContractsProvider: ReactNode = ({children}: ReactNode[]) => {
    const { account, active, activate, deactivate } = useWeb3React();
    const [scissors, setScissors] = useState(0);
    const [tomatoes, setTomatoes] = useState(0);
    const [coffee, setCoffee] = useState(0);

    async function countCoffee(account) {
        const nftCounter = await dinerContract.methods.walletOfOwner(account).call();
        nftCounter.length >= 1 ? setCoffee(nftCounter.length) : setCoffee(0);
      }

      async function countTomatoes(account) {
        const nftCounter = await groceryContract.methods
          .walletOfOwner(account)
          .call();
        nftCounter.length >= 1 ? setTomatoes(nftCounter.length) : setTomatoes(0);
      }

      async function countScissors(account) {
        const nftCounter = await barberContract.methods.walletOfOwner(account).call();
        nftCounter.length >= 1 ? setScissors(nftCounter.length) : setScissors(0);
      }

    const values = {
        coffee,
        tomatoes,
        scissors
    }
    useEffect(() => {
        countCoffee(account);
        countTomatoes(account);
        countScissors(account)
        
    }, [])
    return <ContractsContext.Provider value={values}>{children}</ContractsContext.Provider>;

}

export default ContractsProvider;