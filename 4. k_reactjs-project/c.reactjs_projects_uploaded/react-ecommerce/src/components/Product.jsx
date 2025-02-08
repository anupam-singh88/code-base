import React from 'react'
import { NavLink } from 'react-router-dom'
import FormatPrice from '../Helpers/FormatPrice'

const Product = (props) => {
    return (
        <NavLink to={`/singleproduct/${props.elm.id}`}>
            <figure>
                <img src={props.elm.image} className='featureImg' alt={props.elm.name} />
                <figcaption className='caption'> <h3>{props.elm.name}</h3>
                    <p>{<FormatPrice price={props.elm.price} />}</p></figcaption>

            </figure>
        </NavLink>
    )
}

export default Product
