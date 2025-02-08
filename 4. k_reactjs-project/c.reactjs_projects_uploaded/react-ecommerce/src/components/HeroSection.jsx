import React from 'react'
import './css/HeroSection.css'
import heroimg from '../assets/hero.jpg'
import { NavLink } from 'react-router-dom'


const HeroSection = (props) => {
    return (
        <>
            <div className="hero">
                <div className="heroBox1">
                    <p style={{
                        fontWeight: '600',
                        color: 'rgb(36, 94, 170)',
                        letterSpacing: '1.5px',
                        fontSize: '22px'
                    }}>Welcome To</p>

                    <h1 style={{
                        fontFamily: 'system-ui',
                        margin: '12px 0',
                        letterSpacing: '1px'
                    }}>Meri {props.type}</h1>

                    <p style={{
                        color: 'rgb(29 29 29 / 80%)',
                        fontSize: '15px',
                        letterSpacing: '1px'
                    }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum obcaecati ullam ad saepe nobis porro!</p>

                    <NavLink to='/products'>
                        <button className="heroBtn">{props.btnType}</button></NavLink>
                </div>
                <div className="heroBox2">
                    <img src={heroimg} alt="" className='heroimg' />
                </div>
            </div>
        </>
    )
}

export default HeroSection
