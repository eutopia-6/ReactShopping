import React from 'react'
import { Link } from "react-router-dom";
import { ShoppingCart, UserCircle } from "phosphor-react";
import { useState, useEffect } from 'react';
import "./navbar.css";
import Modal from 'react-modal';

export const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalOpen = () => {setIsModalOpen(true);};
  const handleModalClose = () => {setIsModalOpen(false);};

  return (
    <div className="navbar">
        <div className="links">
            <div className="shop">
              <Link to="/"><b>Shop</b></Link>
            </div>
            <Link to="/cart">
                <ShoppingCart size={40}/>
            </Link>
            <div className="user">
              <Link onClick={handleModalOpen}>
                <UserCircle size={40} color='white'/>
              </Link>
            </div>
        </div>
        <Modal isOpen={isModalOpen} onRequestClose={handleModalClose}>
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
          <button onClick={handleModalClose}>Close</button>
        </Modal>
    </div>
  )
}
