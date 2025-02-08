import React, { useContext } from 'react'
import ItemContext from '../context/ItemContext'
import '../App.css'

export default function Products(props) {
    const { deleteItem, incrementQty, decrementQty, } = useContext(ItemContext)

    const { id, title, description, price, img, quantity } = props.item;
    // console.log(title)
    return (
        <>
            <div className="productItem">
                <img src={img} className='productImg' alt="" />

                <div className="productName">
                    <h5>{title}</h5>
                    <p>{description}</p>
                </div>

                <div className="productBtns">
                    <button className='increase btns' onClick={() => {
                        decrementQty(id)
                    }}>-</button>
                    <p className='quantity'>{quantity}</p>
                    <button className='decrease btns' onClick={() => {
                        incrementQty(id)
                    }}>+</button>
                </div>
                <div>
                    <h3>₹ {price}</h3>
                </div>
                <div className="productDeleteBtn">
                    <i className="fa-solid fa-trash" style={{ color: "#d80e0e" }} onClick={() => {
                        deleteItem(id);
                    }}></i>
                </div>
            </div>
            <hr />

        </>
    )
}
