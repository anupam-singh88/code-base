import React from 'react'
import './App.css'
import { useNavigate } from 'react-router-dom'

const App = () => {
  const navigate = useNavigate()
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <h2>Home page</h2>
      <button
        onClick={() => {
          localStorage.setItem('isAuthenticated', true)
          navigate('/protected')
        }}>Go To Protected Page</button>
    </div>
  )
}

export default App
