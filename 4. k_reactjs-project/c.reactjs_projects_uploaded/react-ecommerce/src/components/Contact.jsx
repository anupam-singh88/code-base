import React from 'react'
import './css/Contact.css'

import { useAuth0 } from "@auth0/auth0-react";

const Contact = () => {
    const { isAuthenticated, user } = useAuth0();
    return (
        <div>
            <h1 style={{
                textAlign: 'center',
                margin: '25px',
                fontSize: '34px'
            }}>Contact Page</h1>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224611.8619497051!2d77.15426155628947!3d28.40234434933154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cdc15f5a424b1%3A0xe4f50576c850e0f2!2sFaridabad%2C%20Haryana!5e0!3m2!1sen!2sin!4v1695194445919!5m2!1sen!2sin" style={{ border: "0", width: "100%", height: "450px" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>

            <div className="contactForm">
                <form id='form' action='https://formspree.io/f/xyyqjnqe' method='post'>
                    <input type="text" name="username" className='inp' id="username" placeholder='Username' value={isAuthenticated ? user.name : ""} />
                    <input type="email" name="useremail" className='inp' id="useremail" placeholder='Email' value={isAuthenticated ? user.email : ""} />
                    <textarea name="usermessage" id="usermessage" className='inp' cols="30" rows="10" placeholder='Enter your message'></textarea>
                    <button className='contactBtn'>Send</button>
                </form>
            </div>
        </div>
    )
}

export default Contact
