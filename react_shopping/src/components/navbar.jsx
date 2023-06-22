import React from 'react'
import { Link } from "react-router-dom";
import { ShoppingCart, UserCircle } from "phosphor-react";
import { useState, useEffect } from 'react';
import "./navbar.css";
import Modal from 'react-modal';
import jwt_decode from "jwt-decode";

export const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser ] = useState({});
  const handleModalOpen = () => {setIsModalOpen(true);};
  const handleModalClose = () => {setIsModalOpen(false)};

  const isUserEmpty = () => {
    return Object.keys(user).length === 0;
  };

  const handCallbackResponse = (response) => {
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
 }
  
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "97815386692-82ttib8dqglele56ndmsf9t0c1l17uii.apps.googleusercontent.com",
      callback: handCallbackResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "filled_white", size: "medium", shape: "square", type: "icon"}
    );
  }, []);

  return (
    <div className="navbar">
        <div className="links">
            <div className="shop">
              <Link to="/"><b>Shop</b></Link>
            </div>
            <Link to="/cart">
                <ShoppingCart size={40}/>
            </Link>
            <div id="signInDiv"/>
            {!(isUserEmpty()) &&  <h4 className='username'>{user.name}</h4>}
            <div className="user">
              <Link onClick={handleModalOpen}>
                <UserCircle size={40} color='white'/>
              </Link>
            </div>
        </div>
        <Modal 
        closeTimeoutMS={2000} 
        isOpen={isModalOpen} 
        onRequestClose={handleModalClose} 
        shouldCloseOnOverlayClick={true}>
          <div>
            <div>
            <b>Username</b>
            </div>
            <input type="username"/>
          </div>

          <div>
            <div>
              <b>Password</b>
            </div>
          <input type="password"/>
          </div>
          <br/>
        </Modal>
    </div>
  )
}
