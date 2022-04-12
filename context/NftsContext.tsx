import React, {createContext, useEffect, useState, ReactNode, useContext }from 'react';
import {NftsContextType} from  "../@types/NftsContextType";
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
import {countCoffee, countTomatoes, countScissors} from "../utils/nftCountFunctions"

const defaultNfts: NftsContextType = {
    tomatoes: 0,
    coffee: 0,
    scissors: 0,
    ownsNft: false
}
const web3 = new Web3(Web3.givenProvider);
declare const window: any;

const groceryContract = new web3.eth.Contract(groceryABI as any, grocery_address);
const barberContract = new web3.eth.Contract(barberABI as any, barber_address);
const dinerContract = new web3.eth.Contract(dinerABI as any, diner_address);

const NftsContext = createContext<NftsContextType>(defaultNfts);

export function useNftsContext(){
return useContext(NftsContext);
}
export const NftsProvider = ({children}) => {
    const { account, active} = useWeb3React();
    const [scissors, setScissors] = useState<number>(0);
    const [tomatoes, setTomatoes] = useState<number>(0);
    const [coffee, setCoffee] = useState<number>(0);
    const [ownsNft, setOwnsNft] = useState<boolean>(false);

    function getOwnsNft() {
        if (
          tomatoes > 0 ||
          coffee > 0 ||
          scissors > 0
        ) {
          setOwnsNft(true);
        } else {
          setOwnsNft(false);
        }
        setOwnsNft(true)
      }
    useEffect(() => {
        if(window.ethereum !== undefined && account){
        countCoffee(account).then(coffee => setCoffee(coffee));
        countTomatoes(account).then(tomatoes => setTomatoes(tomatoes));
        countScissors(account).then(scissors => setScissors(scissors));
        getOwnsNft()
        }
       
    }, [account])
    return <NftsContext.Provider value={{tomatoes,coffee, scissors, ownsNft}}>{children}</NftsContext.Provider>;

}

