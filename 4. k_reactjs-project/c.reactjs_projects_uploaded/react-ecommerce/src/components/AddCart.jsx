import React, { useState, useContext } from 'react'
import './css/PageNavigation.css'
import { NavLink } from 'react-router-dom'
import CartCont from '../context/CartContext'


const AddCart = ({ colors, stock, singleProduct }) => {
    const { addCart } = useContext(CartCont);
    const { id } = singleProduct;
    // console.log(nam)
    const [colrNum, setColrNum] = useState(0)
    const [amount, setAmount] = useState(1)
    const decreaseFn = () => {
        amount > 1 ? setAmount(amount - 1) : setAmount(1)
    }
    const increaseFn = () => {
        amount < stock ? setAmount(amount + 1) : setAmount(stock)
    }
    return (
        <>
            <div className='colorDiv'>
                <p>Color :</p>
                {colors.map((curColor, id) => {
                    return (<p style={{ backgroundColor: curColor }} key={id}
                        className={id === colrNum ? 'clr addBdr' : 'clr opq'} onClick={() => {
                            setColrNum(id)
                        }}
                    > </p>)
                })}
            </div>
            <div className="cartBtn">
                <p className='cBtn' onClick={decreaseFn}> <i className="fa-solid fa-minus"></i> </p>
                <p className='cBtn' style={{ color: '#0a1435' }}>{amount}</p>
                <p className='cBtn' onClick={increaseFn}><i className="fa-solid fa-plus"></i></p>
            </div>
            <NavLink to='/cart' onClick={() => {
                addCart(amount, singleProduct, colrNum, id)
            }}>
                <button className="cart">ADD TO CART</button>
            </NavLink>
        </>)
}

export default AddCart


// import React from 'react'

// const AddCart = () => {
//     return (
//         <div>
//             <p>d</p>
//         </div>
//     )
// }

// export default AddCart
