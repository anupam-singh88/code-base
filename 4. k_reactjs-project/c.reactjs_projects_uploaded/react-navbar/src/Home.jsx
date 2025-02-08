import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
import './Home.css'

const Home = () => {
    // let burger = document.getElementById('burger');
    // burger.addEventListener('click', () => {
    //     // let nav = document.querySelector('.nav');
    //     console.log(nav)
    // })
    // const [style, navStyle] = useState()
    const burgerHandler = () => {
        let navBar = document.getElementById('navBar');
        let logo = document.querySelector('.logo');
        let navUl = document.querySelector('.navUl');
        navBar.classList.toggle('h-class')
        // logo.style.marginTop = '20px'
        navUl.classList.toggle('v-class')
        // navUl.style.display = 'flex'
        console.log(navBar)
        console.log("click")
    }
    return (
        <>
            <div className="navbar" id='navBar'>
                <div className="logo">
                    <p>Meri <span className='heading'>Dukan</span></p>
                </div>
                <div className="navUl">
                    <ul>
                        <a href='/'><li>Home</li></a>
                        <a href='/about'><li>About</li></a>
                        <a href='/products'><li>Products</li></a>
                        <a href='/contact'><li>Contact</li></a>

                    </ul>
                    <div className="navBtns">
                        <a href='/login'>
                            <button className='login'>Log In</button></a>

                        <a href='/cart'><i className="fa-solid fa-cart-shopping"></i><span className='addCart'>1</span></a>
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

export default Home
