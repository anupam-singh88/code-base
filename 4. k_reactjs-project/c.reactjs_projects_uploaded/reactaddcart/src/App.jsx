import React from 'react'
import './App.css'
import CartHeader from './components/CartHeader'
import CartItem from './components/CartItem'

export default function App() {
  return (
    <>
      <div className="cartContainer">
        <CartHeader />
        <hr />
        <CartItem />
      </div>
    </>
  )
}
