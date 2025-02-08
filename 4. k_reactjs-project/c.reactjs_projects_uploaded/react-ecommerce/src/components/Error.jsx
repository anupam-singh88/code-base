import React from 'react'
import { Link } from 'react-router-dom'
import './css/Error.css'

const Error = () => {
    return (
        <>
            <div className="errorContainer">
                <h1 style={{ fontSize: '4rem' }}>404</h1>
                <h3 style={{
                    fontSize: '2rem',
                    color: '#0a1435'
                }}>Oh! You're lost.</h3>
                <h4 style={{
                    fontSize: '2rem',
                    marginTop: '7px'
                }}>Page not found</h4>
                <Link to='/'><button className='errorbtn'>Go Back To Home</button></Link>
            </div>
        </>
    )
}

export default Error
