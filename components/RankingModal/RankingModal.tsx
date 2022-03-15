import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Web3 from 'web3';
import { useWeb3React } from "@web3-react/core";

import barberABI from  '../../abi/BarberShopNFT.json';
import groceryABI from  '../../abi/GroceryStoreNFT.json';
import dinerABI from  '../../abi/DinerNFT.json';

const barber_address = "0x1C26daC2a2e9Bb057fCC061a1903491bA1B5630C";
const grocery_address = "0xe2284c96faEdF807B4850d271a01e68fF7a443aE";
const diner_address = "0xee2e93C1E58BD5BC42eE0365401F2C586f4f1694";
import styles from './RankingModal.module.css';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "60%",
  height:"60%",
  bgcolor: '#F3DFC1',
  boxShadow: 24,
  fontFamily: "OldNewspaperTypes",
  p: 4,
  textAlign: "center"
};


export const RankingModal= ({
    isOpen,
    handleClose,
    title,
} :any) => {

  const web3 = new Web3(Web3.givenProvider);
  const { account } = useWeb3React();
  const [barberScore, setBarberScore] = useState();
  const [groceryScore, setGroceryScore] = useState();
  const [dinerScore, setDinerScore] = useState();

  async function getBarberScore(){
    const barberContract = new web3.eth.Contract(barberABI as any, barber_address);
    let getScore;
    try{ 
      getScore = await barberContract.methods.getCurrentScore().call();
    }
    
    catch(err: any){
      console.log('barberScore: ', err);
    }finally{
      setBarberScore(getScore);
    }
  }
  async function getGroceryScore(){
    const groceryContract = new web3.eth.Contract(groceryABI as any, grocery_address);
    let getScore;
    try{ 
      getScore = await groceryContract.methods.getCurrentScore().call();
    }
    catch(err: any){
      console.log('groceryScore: ', err);
    }finally{
      setGroceryScore(getScore);
    }
  }
  async function getDinerScore(){
    const dinerContract = new web3.eth.Contract(dinerABI as any, diner_address);
    let getScore;
    try{ 
      getScore = await dinerContract.methods.getCurrentScore().call();
    }
    catch(err: any){
      console.log('dinerScore: ', err);
    }finally{
      setDinerScore(getScore);
    }
  }
  function handleRanking(){

  }

  const TableContent = () => {
   return ( 
   <TableContainer  className={styles.rankingModal}>
           <Table sx={{ minWidth: 650 }} aria-label="simple table">
           <TableHead>
           <TableRow>
             <TableCell>Business</TableCell>
             <TableCell align="right">Score</TableCell>
           </TableRow>
         </TableHead>
         <TableBody>
           <TableRow>
           <TableCell component="th" scope="row">
                Barber
              </TableCell>
              <TableCell align="right">{barberScore}</TableCell>
             </TableRow>
             <TableRow>
           <TableCell component="th" scope="row">
                Diner
              </TableCell>
              <TableCell align="right">{dinerScore}</TableCell>
             </TableRow>
             <TableRow>
           <TableCell component="th" scope="row">
                Grocery
              </TableCell>
              <TableCell align="right">{groceryScore}</TableCell>
             </TableRow>
           </TableBody>
</Table>
    </TableContainer>
     );

  }
  

useEffect(() => {
  if(account){
    getDinerScore();
    getBarberScore();
    getGroceryScore();
  }

},[account]);

  return (
    <div>
      <Modal className={styles.rankingModal}
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <TableContent />
        </Box>
      </Modal>
    </div>
  );
}