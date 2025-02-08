import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../context/Firebase';
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const { signINUserWithEmailAndPassword, signInWithGoogle, isLoggedIn } = useFirebase();
    // console.log(isLoggedIn)
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const submitHandler = (e) => {
        e.preventDefault()
        signINUserWithEmailAndPassword(email, password)
        setEmail('');
        setPassword('')
    }
    useEffect(() => {
        if (isLoggedIn) {
            navigate('/')
        }
    }, [navigate, signINUserWithEmailAndPassword, signInWithGoogle, isLoggedIn])
    return (
        <div>
            <div className="container my-4">
                <h1 className='text-center'>Login</h1>
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
                        Login
                    </Button>
                </Form>
                <h1 className='mt-3 mb-5'>OR</h1>
                <Button variant="danger" onClick={() => {
                    signInWithGoogle()
                }}>
                    Sign IN With Google
                </Button>
            </div>
        </div>
    )
}

export default Register
