import React, { useState, useContext } from 'react'
import CartCont from '../context/CartContext'
import { Scrollbars } from 'react-custom-scrollbars-2';
import './css/Cart.css'
import CartItem from './CartItem';
import FormatPrice from '../Helpers/FormatPrice'
import { NavLink } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

const Cart = () => {
    const { isAuthenticated, user } = useAuth0();
    const { cart, total_item, total_price, clearCart } = useContext(CartCont)
    const [scrollBarStyle, setScrollBarStyle] = useState({ height: 400 })
    // console.log(cart)
    if (cart.length === 0) {
        return (<div className="cartDetails carta">
            {
                isAuthenticated && (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '12px 0'
                    }}>
                        <img src={user.picture} alt={user.name} style={{
                            width: '30px',
                            margin: '0 10px'
                        }} />
                        <h3>{user.name}</h3>
                        <p>{user.email}</p>
                    </div>
                )
            }
            <h3 style={{ marginBottom: '10px' }}>Shopping Cart</h3>
            <p style={{ marginBottom: '10px' }}>You have <strong>{total_item}</strong> items in Shopping Cart </p>
            <NavLink to='/products' >
                <button className="btn a">Add Products</button>
            </NavLink>
        </div>)
    }

    return (
        <> {
            isAuthenticated && (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '12px 0'
                }}>
                    <img src={user.picture} alt={user.name} style={{
                        width: '30px',
                        margin: '0 10px'
                    }} />
                    <h3>{user.name}</h3>
                    <p>{user.email}</p>
                </div>
            )
        }
            <div className="cartDetails">
                <h3>Shopping Cart</h3>
                <p>You have <strong>{total_item}</strong> items in Shopping Cart </p>
            </div>


            <Scrollbars style={scrollBarStyle}>
                {
                    cart.map((item, id) => {
                        return <CartItem item={item} key={id} />
                    })
                }

            </Scrollbars>
            <br />
            <p style={{ textAlign: 'center' }}>Total Amount  - <strong>  <FormatPrice price={total_price} /> </strong></p>
            <div className='btnbox'>
                <div style={{ textAlign: 'center' }}>
                    <NavLink to='/products' >
                        <button className="btn a">Continue Shopping</button>
                    </NavLink>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <button className="btn" onClick={clearCart}>Clear Cart</button>
                </div>
            </div>
        </>
    )
}

export default Cart
// import React from 'react'

// const Cart = () => {
//     return (
//         <div>
//             <p>dummy</p>
//         </div>
//     )
// }

// export default Cart
