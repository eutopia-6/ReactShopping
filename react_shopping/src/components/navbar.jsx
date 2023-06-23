import React from 'react'
import { Link } from "react-router-dom";
import { ShoppingCart, UserCircle } from 'phosphor-react';
import { useState, useEffect } from 'react';
import "./navbar.css";
import Modal from 'react-modal';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';

export const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(0);
  const handleModalOpen = () => {setIsModalOpen(true);};
  const handleModalClose = () => {setIsModalOpen(false)};
  const login = useGoogleLogin({
    onSuccess: tokenResponse => console.log(tokenResponse),
  });

  const getUser = (credentialResponse) => {
    var userObject = jwt_decode(credentialResponse);
    setUser(userObject);
    console.log(userObject);
    document.getElementById("user").hidden = true;
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
            {!(user === 0) && <div className='username'>{user.name}</div>}
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
              }}
              onError={() => {
                console.log('Login Failed');
              }}
              type='icon'
              shape='circle'/>
            </div>
          </div>
        </Modal>
    </div>
  )
}
