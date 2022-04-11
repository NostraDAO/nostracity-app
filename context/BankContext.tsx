import React, {createContext, useEffect, useState, ReactNode, useContext }from 'react';
import {BankContextType} from  "../@types/BankContextType";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import {getBarberScore, getGroceryScore, getDinerScore} from "../utils/nftScoresFunctions"

const defaultScore: BankContextType = {
    barberScore: 0,
    groceryScore: 0,
    dinerScore: 0
}
const web3 = new Web3(Web3.givenProvider);
const BankContext = createContext<BankContextType , any>(defaultScore);

export function useBankContext(){
return useContext(BankContext);
}
const BankProvider: ReactNode = ({children} : ReactNode[]) => {
    // const { account} = useWeb3React();
    const [groceryScore, setGroceryScore] = useState(0)
    const [barberScore, setBarberScore] = useState(0)
    const [dinerScore, setDinerScore] = useState(0)

    useEffect(() => {
            getBarberScore().then(score => setBarberScore(score.score))
            getGroceryScore().then(score => setGroceryScore(score.score))
            getDinerScore().then(score => setDinerScore(score.score))
            console.log(dinerScore, groceryScore, barberScore)
    }, [])
    return <BankContext.Provider value={{groceryScore, barberScore, dinerScore}}>{children}</BankContext.Provider>;

}

export default BankProvider;