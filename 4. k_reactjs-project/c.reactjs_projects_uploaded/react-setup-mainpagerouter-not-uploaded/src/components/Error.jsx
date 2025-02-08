import React from 'react'

const Error = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
        }}>
            <h1>404 Not Found</h1>
            <p>The page you are looking for does not exist.</p>
        </div>
    )
}

export default Error
