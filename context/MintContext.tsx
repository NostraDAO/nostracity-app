import React, {createContext, useEffect, useState, ReactNode, useContext }from 'react';
import {MintContextType} from  "../@types/MintContextType";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import { getBarberAllowance, getDinerAllowance, getGroceryAllowance} from "../utils/allowanceFunctions"
import {getBarberPrice, getGroceryPrice, getDinerPrice} from "../utils/mintPriceFunctions"
import {getBarberLimit, getGroceryLimit, getDinerLimit} from "../utils/nftLimitFunctions"
import {getBarberRemain, getGroceryRemain, getDinerRemain} from "../utils/remainingNftFunctions"

const defaultMint: MintContextType = {
    barberPrice: 0,
    groceryPrice: 0,
    dinerPrice: 0,
    barberAllowance: 0,
    groceryAllowance: 0,
    dinerAllowance: 0,
    barberLimit: 0,
    groceryLimit: 0,
    dinerLimit: 0,
    barberRemain: 0,
    dinerRemain: 0,
    groceryRemain: 0
}
const web3 = new Web3(Web3.givenProvider);
const MintContext = createContext<MintContextType | null>(defaultMint);

export function useMintContext(){
return useContext(MintContext);
}
const MintProvider = ({children}) => {
     const { account} = useWeb3React();
     const [barberPrice, setBarberPrice] = useState<number | undefined>(0)
     const [groceryPrice, setGroceryPrice] = useState<number | undefined>(0)
     const [ dinerPrice, setDinerPrice] = useState<number | undefined>(0)
     const [barberAllowance, setBarberAllowance] = useState<number | undefined>(0)
     const [dinerAllowance, setDinerAllowance] = useState<number | undefined>(0)
     const [ groceryAllowance, setGroceryAllowance] = useState<number | undefined>(0)
     const [barberLimit, setBarberLimit] = useState<number | undefined>(0)
     const [dinerLimit, setDinerLimit] = useState<number | undefined>(0)
     const [groceryLimit, setGroceryLimit] = useState<number | undefined>(0)
     const [barberRemain, setBarberRemain] = useState<number | undefined>(0)
     const [groceryRemain, setGroceryRemain] = useState<number | undefined>(0)
     const [dinerRemain, setDinerRemain] = useState<number | undefined>(0)


    useEffect(() => {
        getBarberPrice(account).then(price => setBarberPrice(price))
        getGroceryPrice(account).then(price => setGroceryPrice(price))
        getDinerPrice(account).then(price => setDinerPrice(price))

        getBarberAllowance(account).then(allowance => setBarberAllowance(allowance))
        getGroceryAllowance(account).then(allowance => setGroceryAllowance(allowance))
        getDinerAllowance(account).then(allowance => setDinerAllowance(allowance))

        getBarberLimit().then(limit => setBarberLimit(limit))
        getGroceryLimit().then(limit => setGroceryLimit(limit))
        getDinerLimit().then(limit => setDinerLimit(limit))

        getBarberRemain().then(remain => setBarberRemain(remain))
        getGroceryRemain().then(remain => setGroceryRemain(remain))
        getDinerRemain().then(remain => setDinerRemain(remain))
        
    }, [])
    return <MintContext.Provider value={{
        barberPrice, 
        groceryPrice, 
        dinerPrice, 
        barberAllowance, 
        groceryAllowance, 
        dinerAllowance,
        barberLimit,
        groceryLimit,
        dinerLimit,
        barberRemain,
        dinerRemain,
        groceryRemain
    }}>{children}</MintContext.Provider>;

}

export default MintProvider;