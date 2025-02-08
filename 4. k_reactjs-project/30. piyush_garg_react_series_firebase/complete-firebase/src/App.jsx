import React, { useEffect, useState } from 'react'
import { useFirebaseContext } from './context/Firebase'
import './App.css'

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signUpWithEmailAndPassword, signInWithEmailAndPasswordFunc, putData, signUpwithGoogle, logOut, user, getDataFromRealDB } = useFirebaseContext()

  return (
    <div className='container'>
      {/* {signUpWithEmailAndPassword} */}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        name="email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        name="password"
      />
      <button onClick={() => {
        signUpwithGoogle()
      }}>Sign Up With Google</button>
      <button onClick={() => {
        signUpWithEmailAndPassword(email, password)
      }}>Sign Up With Custom Email and Password</button>

      <button onClick={() => {
        signInWithEmailAndPasswordFunc(email, password)
      }}>Sign In With Custom Email and Password</button>
      <button
        onClick={() => {
          logOut()
        }}
        disabled={user ? false : true}
      >Log Out</button>

      <button onClick={() => {
        putData('user/data', {
          id: 12,
          name: 'asnupam',
          age: 224
        })
      }}>Save Data To real time db</button>

      <button onClick={() => {
        getDataFromRealDB('user/')
      }}>get dAta from real db</button>
    </div>
  )
}

export default App
