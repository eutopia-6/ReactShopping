import React from 'react'
import { Link } from "react-router-dom";
import { ShoppingCart, UserCircle, Hamburger, Star } from 'phosphor-react';
import { useState, useEffect } from 'react';
import "./navbar.css";
import Modal from 'react-modal';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { slide as Menu } from 'react-burger-menu'
import { TestFormPost } from './testformpost';

export const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignOutOpen, setSignOutOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [user, setUser] = useState(0);
  const handleModalOpen = () => {setIsModalOpen(true);};
  const handleModalClose = () => {setIsModalOpen(false);};
  const handleSignOutOpen = () => {setSignOutOpen(true);};
  const handleSignOutClose = () => {setSignOutOpen(false);};
  const handleRegisterOpen = () => {setIsRegisterOpen(true);};
  const handleRegisterClose = () => {setIsRegisterOpen(false);};
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleRegSubmit = (e) => {
    console.log("Submitted");
    e.preventDefault();
    const userInfo = {
      name: name,
      password: password
    }

    fetch('https://react-shopping-flask.vercel.app/user/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    }).catch((error) => {
      console.error(error);})
  }
  
  const getUser = (credentialResponse) => {
    var userObject = jwt_decode(credentialResponse);
    setUser(userObject);
    document.getElementById("user").hidden = true;
  }

  const closeRegister = (e) => {
    e.preventDefault();
    const form = document.getElementById('register-form');
    form.submit();
    handleRegisterClose();
  }

  const userLogOut = () => {
    setUser(0);
    handleSignOutClose();
    document.getElementById("user").hidden = false;
  }

  const openRegister = () => {
    handleModalClose();
    handleRegisterOpen();
  }

  return (
    <div>
       <Menu 
        customBurgerIcon={<Hamburger className='burger' size={40} color='white'/>}>
          <Link to="/favorites" className='favoritelink'>
          <Star color='black' size={20}/> 
          <p>Favorites</p>
          </Link>
        </Menu>
      <div className="navbar">
        <div className="links">
            <div className="shop">
              <Link to="/"><b>Shop</b></Link>
            </div>
            <Link to="/cart">
                <ShoppingCart size={40} className='shoppingcart'/>
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

                <Link className='links' onClick={openRegister}>
                  Sign Up
                </Link>
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
        <Modal 
        closeTimeoutMS={1000} 
        isOpen={isRegisterOpen} 
        onRequestClose={handleRegisterClose} 
        shouldCloseOnOverlayClick={true}>
          <div className='modal-content-register'>
            <form 
            id='register-form'
            className='registerform'
            onSubmit={handleRegSubmit}>
                <input 
                className='usernameBox' 
                type="username"
                placeholder='Username'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required/>

                <input 
                className='passwordBox' 
                type="password"
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required/>
                
                <button 
                className='register' 
                type='submit'
                onClick={closeRegister}>
                Register</button>
              </form>
              </div>
        </Modal>
    </div>
  </div>
  )
}
