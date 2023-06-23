import React from 'react'
import { Link } from "react-router-dom";
import { ShoppingCart, UserCircle } from 'phosphor-react';
import { useState, useEffect } from 'react';
import "./navbar.css";
import Modal from 'react-modal';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';

export const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignOutOpen, setSignOutOpen] = useState(false);
  const [user, setUser] = useState(0);
  const handleModalOpen = () => {setIsModalOpen(true);};
  const handleModalClose = () => {setIsModalOpen(false)};
  const handleSignOutOpen = () => {setSignOutOpen(true)};
  const handleSignOutClose = () => {setSignOutOpen(false)};

  const getUser = (credentialResponse) => {
    var userObject = jwt_decode(credentialResponse);
    setUser(userObject);
    console.log(userObject);
    document.getElementById("user").hidden = true;
  }

  const userLogOut = () => {
    setUser(0);
    handleSignOutClose();
    document.getElementById("user").hidden = false;
  }

  return (
    <div className="navbar">
        <div className="links">
            <div className="shop">
              <Link to="/"><b>Shop</b></Link>
            </div>
            <Link to="/cart">
                <ShoppingCart size={40}/>
            </Link>
              {!(user === 0) && 
            <Link onClick={handleSignOutOpen}>
              <div className='username'>
                {user.name}
              </div>
            </Link>}
            <div id="user">
              <Link onClick={handleModalOpen}>
                <UserCircle size={40} color='white'/>
              </Link>
            </div>
        </div>
        <Modal 
        closeTimeoutMS={1000} 
        isOpen={isModalOpen} 
        onRequestClose={handleModalClose} 
        shouldCloseOnOverlayClick={true}>
          <div className='modal-content'>
              <form className='signinform'>
                <input 
                className='usernameBox' 
                type="username"
                placeholder='Username'/>

                <input 
                className='passwordBox' 
                type="password"
                placeholder='Password'/>
                
                <button 
                className='signin' 
                type='submit'>
                Sign In</button>
              </form>
            <p>or you can sign in with</p>
            <div className='googleIcon'>
              <GoogleLogin
              onSuccess={credentialResponse => {
                getUser(credentialResponse.credential);
                handleModalClose();
              }}
              onError={() => {
                console.log('Login Failed');
              }}
              type='icon'
              shape='circle'/>
            </div>
          </div>
        </Modal>
        <Modal 
        closeTimeoutMS={1000} 
        isOpen={isSignOutOpen} 
        onRequestClose={handleSignOutClose} 
        shouldCloseOnOverlayClick={true}>
          <div className='signout-modal'>
            <button 
                className='signout' 
                type='submit'
                onClick={userLogOut}>
                Sign Out</button>
          </div>
        </Modal>
    </div>
  )
}
