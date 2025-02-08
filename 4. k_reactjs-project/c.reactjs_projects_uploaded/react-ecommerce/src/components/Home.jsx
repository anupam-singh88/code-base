import React, { useContext, useState } from 'react'
import HeroSection from './HeroSection'
import Categories from './Categories'
import Feature from './Feature'
import CartCont from '../context/CartContext'
// import { CartContext } from '../context/CartContext'
// CartCont

export default function Home() {
    const { name } = useContext(CartCont)

    return (
        <>
            <HeroSection type='Dukaan' btnType='Show Now' />
            {/* <Categories /> */}
            {/* {name} */}
            <Feature />
        </>
    )
}
