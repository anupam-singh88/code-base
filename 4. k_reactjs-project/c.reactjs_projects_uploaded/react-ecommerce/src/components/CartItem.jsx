import React, { useContext } from 'react'
import './css/Cart.css'
import CartCont from '../context/CartContext'
import FormatPrice from '../Helpers/FormatPrice'
const CartItem = (props) => {
    const { id, name, description, price, image, max, colors } = props.item;
    // console.log(colors)
    const { deleteItem, incrementQty, decrementQty } = useContext(CartCont);

    return (
        <>
            <div className="productItem">
                <img src={image[0].url} className='productImg' alt="" />

                <div className="productName">
                    <h3>{name}</h3>
                    {/* <p>{description.slice(0, 90)}</p> */}
                    <p>{<FormatPrice price={price} />}</p>
                    <p>Color : <span style={{ backgroundColor: `${colors}` }} className='cartcol'></span></p>

                </div>

                <div className="productBtns">
                    <button className='increase btns' onClick={() => {
                        decrementQty(id)
                    }}>-</button>
                    <p className='quantity'>{max}</p>
                    <button className='decrease btns' onClick={() => {
                        incrementQty(id)
                    }}>+</button>
                </div>
                <div>
                    <h3>  <FormatPrice price={price * max} /> </h3>
                </div>
                <div className="productDeleteBtn">
                    <i className="fa-solid fa-trash" style={{ color: "#d80e0e", cursor: 'pointer' }} onClick={() => {
                        deleteItem(id);
                    }}></i>
                </div>
            </div>
            <hr />
        </>
    )
}

export default CartItem
