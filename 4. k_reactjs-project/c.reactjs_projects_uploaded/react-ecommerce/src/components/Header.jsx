import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import './css/Header.css'
import CartCont from '../context/CartContext'

import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
    const { total_item } = useContext(CartCont);
    const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

    const burgerHandler = () => {
        let navBar = document.getElementById('navBar');
        let logo = document.querySelector('.logo');
        let navUl = document.querySelector('.navUl');
        navBar.classList.toggle('h-class')
        navUl.classList.toggle('v-class')
    }
    return (
        <>
            <div className="navbar" id='navBar'>
                <div className="logo">
                    <Link to='/'>
                        <p>Meri <span className='heading'>Dukan</span></p></Link>
                </div>
                <div className="navUl">
                    <ul>
                        <Link to='/'><li>Home</li></Link>
                        <Link to='/about'><li>About</li></Link>
                        <Link to='/products'><li>Products</li></Link>
                        <Link to='/contact'><li>Contact</li></Link>

                    </ul>
                    {
                        isAuthenticated && (
                            <div>
                                {/* <img src={user.picture} alt={user.name} /> */}
                                <h3>{user.name}</h3>
                                {/* <p>{user.email}</p> */}
                            </div>
                        )
                    }
                    <div className="navBtns">
                        {
                            isAuthenticated ? <button className='login' onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                                Log Out
                            </button> : <button className='login' onClick={() => loginWithRedirect()}>Log In</button>
                        }
                        <Link to='/cart'><i className="fa-solid fa-cart-shopping"></i><span className='addCart'>{total_item}</span></Link>
                    </div>
                </div>

                <div className="burger" onClick={burgerHandler}>
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>
            </div >
        </>
    )
}

export default Header;
