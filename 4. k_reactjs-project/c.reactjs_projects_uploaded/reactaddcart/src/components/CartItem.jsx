import React, { useContext, useState } from 'react'
import '../App.css'
import Products from './Products'
import { Scrollbars } from 'react-custom-scrollbars-2';
import CartFilters from './CartFilters'
import ItemContext from '../context/ItemContext'


export default function CartItem() {
    const { item, totalItem, totalAmount, clearCart } = useContext(ItemContext);
    const [scrollBarStyle, setScrollBarStyle] = useState({ height: 400 })

    if (item.length === 0) {
        return (<>
            <div className="cartDetails">
                <h3>Shopping Cart</h3>
                <p>You have <strong>{totalItem}</strong> items in Shopping Cart </p>
            </div>
        </>)
    }


    // console.log(item)
    return (
        <>
            <div className="cartDetails">
                <h3>Shopping Cart</h3>
                <p>You have <strong>{totalItem}</strong> items in Shopping Cart </p>
            </div>
            <CartFilters />

            <Scrollbars style={scrollBarStyle}>
                {
                    item.map((item, id) => {
                        return <Products item={item} key={id} />
                    })
                }

            </Scrollbars>
            <br />
            <p style={{ textAlign: 'center' }}>Total Amount  - <strong> {totalAmount} </strong></p>
            <div style={{ textAlign: 'center' }}>
                <button className="btn" onClick={clearCart}>Clear Cart</button>
            </div>
        </>

    )
}
