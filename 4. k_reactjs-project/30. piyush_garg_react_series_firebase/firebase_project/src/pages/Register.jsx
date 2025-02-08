import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../context/Firebase';
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const { signUpUserWithEmailAndPassword, isLoggedIn } = useFirebase();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const submitHandler = (e) => {
        e.preventDefault()
        signUpUserWithEmailAndPassword(email, password)
        setEmail('');
        setPassword('')
    }
    useEffect(() => {
        if (isLoggedIn) {
            navigate('/')
        }
    }, [navigate, isLoggedIn])
    return (
        <div>
            <div className="container my-4">
                <h1 className='text-center'>Register</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" required value={email} onChange={(e) => {
                            setEmail(e.target.value)
                        }} />
                        {/* <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text> */}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" required placeholder="Password" value={password} onChange={(e) => {
                            setPassword(e.target.value)
                        }} />
                    </Form.Group>
                    {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group> */}
                    <Button variant="primary" type="submit">
                        Create Account
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default Register
