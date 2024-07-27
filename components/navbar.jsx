import React from 'react'
import "./navbar.css"
import { useEffect,useState } from 'react';

const Navbar = () => {
    const [sticky,setSticky]= useState(false);

    useEffect(()=>{
      window.addEventListener('scroll',()=>{
        window.scrollY > 5 ? setSticky(true):setSticky(false);
      })
    },[]);

  return (
    <section className={`nav-container  ${ sticky ? "dark-nav" :''}`}>
        <div className="right">
            <img src="../src/assets/logo.png" alt="logo" className="logo" />
            <span className="token-name">Puppy Coin</span>
        </div>
        <div className="left">
            <button className="socialMediaBut">
                <img src="../src/assets/twitter.svg" alt="twitter" />
            </button>
            <button className="socialMediaBut">
                <img src="../src/assets/telegram.svg" alt="telegram" />
            </button>
            <button className="socialMediaBut discord">
            <img src="../src/assets/discord.svg" alt="discord" />
            </button>
        </div>
    </section>
  )
}

export default Navbar