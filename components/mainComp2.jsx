import React from 'react'
import "./mainComp2.css"
import "./mainComp1.css"
import  { useState, useEffect } from "react";

const MainComp2 = () => {

  const [evmAddress, setEvmAddress] = useState("");
  const [referralId, setReferralId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setEvmAddress(event.target.value);
  };

  const handleCheckClick = () => {
    setLoading(true);
    setTimeout(() => {
      const existingReferral = localStorage.getItem(evmAddress);

      if (existingReferral) {
        setReferralId(existingReferral);
      } else {
        const newReferralId = generateReferralId();
        localStorage.setItem(evmAddress, newReferralId);
        setReferralId(newReferralId);
      }

      setLoading(false);
    }, 1000); // Simulate a network request
  };

  const generateReferralId = () => {
    return "xxxx-xxxx-xxxx-xxxx".replace(/[x]/g, () => {
      const r = (Math.random() * 16) | 0;
      return r.toString(16);
    });
  };





  return (
    <div className='container2'>
        <div className="txtprt">
            <h1 className="title2">
                reffral
            </h1>
            <p className="list">
                you can share your reffral link with others
                if anyone joins airdrop with your link
                you will get 10% of their reward
            </p>


       
        {referralId && (
          <p className="referral-id">
            Your Referral ID: <strong>{referralId}</strong>
          </p>
        )}
        <button
          className="checker"
          onClick={handleCheckClick}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="loading-icon"></span>Loading...
            </>
          ) : (
            "Get Referral ID"
          )}
        </button>
        



        </div>
    </div>
  )
}

export default MainComp2