import React, { useEffect } from 'react'
import HeroSection from './HeroSection'
// import './css/Home.css'

const About = () => {
    useEffect(() => {
        console.log(window.trackdesk)
        if (window.trackdesk) {
            console.log('initialisded')
            window.trackdesk("lennyai", "conversion", {
                "conversionType": "freetrial",
                "amount": {
                    "value": "$20"
                }
            });
        }
    }, [])
    return (
        <>

            <HeroSection type='Ecommerce' btnType='Buy Now' />
            <div style={{ margin: '25px' }}>
                <h2 style={{ textAlign: 'center' }}>About Page</h2>
                <p style={{ textAlign: 'center' }}>This is React Ecommerce App</p>

            </div>
        </>
    )
}

export default About
