import React from 'react'
import { useFirebase } from './context/Firebase'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const { isLoggedIn, logOut } = useFirebase();
    const navigate = useNavigate();
    const goToLoginPage = () => {
        navigate('/login')
    }

    return (
        <div>
            <h1>Home baby</h1>
            {isLoggedIn ? <Button variant="primary" onClick={() => {
                logOut()
            }}>
                LogOut
            </Button> : <Button variant="primary" onClick={() => {
                goToLoginPage()
            }}>
                Login
            </Button>}



        </div>
    )
}

export default Home
