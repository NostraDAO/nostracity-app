/* eslint-disable @typescript-eslint/no-empty-function */
import React, {createContext, useEffect, useState, ReactNode, useContext }from 'react';
import {ConnectType} from  "../@types/ConnectType";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";

const defaultConnect: ConnectType = {
    chain:  null,
    account: null,
    active: false,
    activate: () => {},
    deactivate: () => {},
}
const web3 = new Web3(Web3.givenProvider);
const ConnectContext = createContext<ConnectType, null>(defaultConnect);

export function useConnectContext(){
return useContext(ConnectContext);
}
const ConnectProvider: ReactNode = ({children} :ReactNode[]) => {
    const { account, active, activate, deactivate } = useWeb3React();
    const [ chain, setChain] = useState<number>();
    
    async function getChain(): number{
    web3.eth.getChainId().then(chain => setChain(chain))
    }
    useEffect(() => {
        getChain();    
    }, [])
    
     return <ConnectContext.Provider value={{chain, account, active, activate, deactivate}}>{children}</ConnectContext.Provider>;

}

export default ConnectProvider;