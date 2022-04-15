import React, {createContext, useEffect, useState,  useContext }from 'react';
import {UseBondType} from  "../@types/UseBondType"
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";


const defaultBond: UseBondType = {
    bondPrice: 0,
    bossTokens: 0,
    vestingTime: 0,
    discountRate: 0
}
const web3 = new Web3(Web3.givenProvider);
declare const window: any;


const BondContext = createContext<UseBondType>(defaultBond);

export function useBond(){
return useContext(BondContext);
}
export const BondProvider = ({children}) => {
    const { account } = useWeb3React();

    useEffect(() => {
        if(window.ethereum !== undefined && account){
        }
       
    }, [account])
    return <BondContext.Provider value={{bondPrice, bossTokens, vestingTime, discountRate}}>{children}</BondContext.Provider>;

}

