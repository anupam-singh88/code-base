import { createContext, useContext, useEffect, useReducer } from "react";
import CartCont from './CartContext'
import reducer from '../reducer/CartReducer'

const getLocalCartData = () => {
    let localCartData = localStorage.getItem("thapaCart");
    // console.log(localCartData)
    // if (localCartData === []) {
    //     return [];
    // } else {
    //     return JSON.parse(localCartData);
    // }
    const parsedData = JSON.parse(localCartData);
    // console.log(!Array.isArray(parsedData))
    if (!Array.isArray(parsedData)) return [];

    return parsedData;
};

const initialState = {
    // cart: [],
    cart: getLocalCartData(),
    total_item: "",
    total_price: "",
    shipping_fee: 50000,
};

const CartState = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const addCart = (amount, singleProduct, colrNum, id) => {

        dispatch({
            type: 'SET_CART',
            payload: { amount, singleProduct, colrNum, id }
        })
    }

    const deleteItem = (id) => {
        console.log(id)
        dispatch({
            type: 'DELETE_ITEM',
            payload: id
        })
    }
    const incrementQty = (id) => {
        dispatch({ type: "SET_INCREMENT", payload: id });
    }
    const decrementQty = (id) => {
        dispatch({ type: "SET_DECREMENT", payload: id });
    }
    const clearCart = () => {
        dispatch({ type: "CLEAR_CART" });
    }

    useEffect(() => {
        dispatch({
            type: 'SET_TOTAL_ITEM',
            payload: state.cart
        })
        dispatch({
            type: 'SET_TOTAL_PRICE',
            payload: state.cart
        })
        localStorage.setItem("thapaCart", JSON.stringify(state.cart));
        //  getLocalCartData();
        // console.log(a)
        // console.log('cart :', state.cart)
    }, [state.cart, state.total_item, state.total_price])
    return (
        <CartCont.Provider value={{ ...state, addCart, deleteItem, incrementQty, decrementQty, clearCart }}>
            {children}
        </CartCont.Provider>
    )
}

export default CartState
