import React from 'react'
import "./mainComp1.css"
import "./spinner.css"
import { useEffect } from 'react'
import { useState } from 'react'

const MainComp1 = () => {
  

  const [isLoading, setIsLoading] = useState(false);
  
    const handleClick = async () => {
      setIsLoading(true);
  
      // Simulate an async process
      await new Promise(resolve => setTimeout(resolve, 2000));
  
      setIsLoading(false);
      alert('Process completed!');
    };

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
        <input placeholder='Please enter your wallet address...' 
        className='input-wallet'
         type="text" />
         <input type="text" className="input-wallet"
         placeholder='Please enter your reffral ID(optional)' />
          </div>

          <button onClick={handleClick} disabled={isLoading} className="loading-button">
        {isLoading ? <div className="spinner"></div> : 'Click Me'}
      </button>
    </div>
  )
}

export default MainComp1