import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Param = () => {
    const params = useParams()
    const [param, setParams] = useState({})
    const navigate = useNavigate()

    const handleBack = () => {
        if (window.history.length > 1) {
            navigate(-1); // Go back in history if possible
        } else {
            navigate('/'); // Navigate to home if no history
        }
    };

    const handleForward = () => {
        navigate(1); // Go forward in history
    };
    useEffect(() => {
        setParams(params)
    }, [params])
    return (
        <div>
            {JSON.stringify(params)}
            <button onClick={handleBack}>Back</button>
            <button onClick={handleForward}>Forward</button>
        </div>
    )
}

export default Param
