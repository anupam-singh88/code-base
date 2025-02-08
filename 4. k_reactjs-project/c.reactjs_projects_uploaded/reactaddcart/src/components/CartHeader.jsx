import React, { useContext } from 'react'
import '../App.css'
import ItemContext from '../context/ItemContext'

export default function CartHeader() {
    const { totalItem } = useContext(ItemContext);
    return (
        <div className='header'>
            <h3 >React Store</h3>
            <div className='cartId'>
                <i className="fa-solid fa-cart-shopping" style={{ color: "#d29c28" }}></i>
                <p className='addCartTotalItem'>{totalItem}</p>
            </div>
        </div >
    )
}
