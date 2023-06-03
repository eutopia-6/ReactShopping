import React from 'react'
import { Link } from "react-router-dom";
import { ShoppingCart, UserCircle } from "phosphor-react";
import "./navbar.css";

export const Navbar = () => {
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
              <Link>
                <UserCircle size={40} color='white'/>
              </Link>
            </div>
        </div>
    </div>
  )
}
