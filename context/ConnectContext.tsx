/* eslint-disable @typescript-eslint/no-empty-function */
import React, {createContext, useEffect, useState, useContext }from 'react';
import {ConnectType} from  "../@types/ConnectType";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
declare const window: any;

const defaultConnect: ConnectType = {
    chain:  null,
    account: '',
    active: false,
    activate: () => Promise.resolve(false),
    deactivate: () => Promise.resolve(false)
}
const web3 = new Web3(Web3.givenProvider);
const ConnectContext = createContext<ConnectType>(defaultConnect);

export function useConnectContext(){
return useContext(ConnectContext);
}
const ConnectProvider = ({children}) => {
    const { account, active, activate, deactivate } = useWeb3React();
    const [ chain, setChain] = useState<number>();
    const [acc, setAcc] = useState('')
    
    async function getChain(): Promise<any> {
    web3.eth.getChainId().then(chain => setChain(chain))
    }
    useEffect(() => {
        getChain();    
        if(window.ethereum !== "undefined" && typeof account == "string"){
            setAcc(account)
            console.log(acc)
        }
    }, [acc, account])
    
     return <ConnectContext.Provider value={{chain, acc, active, activate, deactivate}}>{children}</ConnectContext.Provider>;

}

export default ConnectProvider;