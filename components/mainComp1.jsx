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
import Modal from 'react-modal'

Modal.setAppElement("#root");




const MainComp1 = () => {
  
  const [evmAddress, setEvmAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const[transactionCount,setTransactionCount]=useState(``);
  const[reward,setReward]=useState(``);
  const [showModal, setShowModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  

  


  const handleInputChange = (event) => {
    setEvmAddress(event.target.value);
  };

  const handleCheckClick = async () => {
    setLoading(true);
    try {
      const count = await getTransactionCount(evmAddress);
      const rewardValue = await getRewardRange(count);
      setTransactionCount(count);
      setReward(rewardValue);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching transaction count:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
            <h1 className="title">Connect your wallet for the Airdrop</h1>
            <p className="frstprgrph">We’re airdropping tokens to
                 puppy coin supporters,<br /> across base network
                 Connect your wallets below to get rewarded. </p>
                 <p className="secondprgrgh">
                  please enter your address that we can check if you
                  are eligble for our airdrop or not ! we'll show 
                  you how much you will get and the number of your transaction
                  in our network.
                 </p>
        </div>
        <div className="blockchainprt">
        <input placeholder='Please enter your EVM address...' 
        className='input-wallet'
         type="text"  value={evmAddress}
         onChange={handleInputChange}/>
         
          </div>
          

          <button
          className="checker"
          onClick={handleCheckClick}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="loading-icon"></span>
            </>
          ) : (
            "Check"
          )}
        </button>
       
        <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Transaction Details"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <h2>Transaction Details</h2>
        <p className='ppp'>Transaction Count: {transactionCount}</p>
        <p className='ppp'>Reward: {reward}</p>
        <button className='closebut' onClick={handleCloseModal}>Close</button>
      </Modal>
          
      
    </div>
  )
}

export default MainComp1