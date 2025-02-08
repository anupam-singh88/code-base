import React from 'react'
import { useNavigate } from 'react-router-dom';

const Component2 = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h1>Dummy Component No : 2</h1>
            <button onClick={() => navigate('/params/1234')}>
                Navigate To Params Page
            </button>
        </div>
    )
}

export default Component2
