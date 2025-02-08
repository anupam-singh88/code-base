import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import { Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './Home'
import Navbar from './components/NavBar'
const App = () => {
  return (
    <>
      {/* <h1 className='container'>Firebase
        <Button variant='success'>Click Me</Button>
      </h1> */}
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<h1>error</h1>} />
      </Routes>
    </>
  )
}

export default App
