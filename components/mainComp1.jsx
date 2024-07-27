import React from 'react'
import "./mainComp1.css"
import "./spinner.css"
import { useEffect } from 'react'
import { useState } from 'react'
import {
  getTransactionCount,
  getRewardRange,
} from "../backend/getTransactionCount";
import Popup from 'reactjs-popup'


const MainComp1 = () => {
  
  const [evmAddress, setEvmAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const[transactionCount,setTransactionCount]=useState(``);
  const[reward,setReward]=useState(``);

  
  

  


  const handleInputChange = (event) => {
    setEvmAddress(event.target.value);
  };

  const handleCheckClick = async () => {
    setLoading(true);
    try {
        setTransactionCount(await getTransactionCount(evmAddress));
        setReward(await getRewardRange(transactionCount));
      console.log(reward,transactionCount)
      /*alert(`Transaction Count: ${transactionCount}\nReward: ${reward}`);*/
      
    } catch (error) {
      console.error("Error fetching transaction count:", error);
    } finally {
      setLoading(false);
    }
  };




/*  const [isLoading, setIsLoading] = useState(false);
  
    const handleClick = async () => {
      setIsLoading(true);
  
      // Simulate an async process
      await new Promise(resolve => setTimeout(resolve, 2000));
  
      setIsLoading(false);
      alert('Process completed!');
    };*/

  return (
    <div className="container">
        
        <div className="txt-prt">
            <h1 className="title">Connect wallets for Airdrops</h1>
            <p className="frstprgrph">We’re airdropping tokens to
                 puppy coin supporters,<br /> across base
                 Connect your wallets below to get rewarded. </p>
                 <p className="secondprgrgh">
                  please enter your address that we can check if u have
                  are eligble for our airdrop 
                 </p>
        </div>
        <div className="blockchainprt">
        <input placeholder='Please enter your EVM address...' 
        className='input-wallet'
         type="text"  value={evmAddress}
         onChange={handleInputChange}/>
         
          </div>
          

          <Popup trigger={
            <button className='checker' onClick={handleCheckClick}
            disabled={loading}
          >
            {loading ? (
              
                <span className="loading-icon"></span>
              
            ) : (
              "Check"
            )}
        </button>
          } modal nested>
          {close =>(<div className="modal">

          
            Transaction Count: {transactionCount} <br />
            Reward: <br /> <br />
            {reward}

            <button className="checker" onClick={()=>close()}>
              close 
            </button>
          </div>)}
          </Popup>
          
          
      
    </div>
  )
}

export default MainComp1