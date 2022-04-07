import React, {createContext, useEffect, useState, ReactNode, useContext }from 'react';
import {ConnectTpe} from  "../@types/ConnectType";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";

const defaultContracts: ContractsType = {
}
const web3 = new Web3(Web3.givenProvider);
const ContractsContext = createContext<ConnectType | null>(defaultConnect);

export function useConnectContext(){
return useContext(ConnectContext);
}
const ConnectProvider: ReactNode = ({children}: ReactNode[]) => {
    const { account, active, activate, deactivate } = useWeb3React();
    
    useEffect(() => {
    }, [])
    return <ContractsContext.Provider value={{chain, account, active, activate, deactivate}}>{children}</ContractsContext.Provider>;

}

export default ContractsProvider;