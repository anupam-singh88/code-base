import React from 'react'
import { useNavigate } from 'react-router-dom'

const Component1 = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Dummy Component No : 1</h1>
            <button onClick={() => navigate('/')}>Navigate To Home</button>
        </div>
    )
}

export default Component1
