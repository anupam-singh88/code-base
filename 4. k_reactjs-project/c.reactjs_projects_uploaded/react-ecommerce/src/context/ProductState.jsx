import React, { useEffect, useReducer } from 'react'
import ProductContext from './ProductContext'
import axios from 'axios';
import reducer from '../reducer/ProductReducer'

const API = "https://api.pujakaitem.com/api/products";

const initialState = {
    isLoading: false,
    isError: false,
    products: [],
    featureProducts: [],
    isSingleLoading: false,
    singleProduct: {},
    productImgArr: []
}

const ProductState = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const getProductData = async (url) => {
        dispatch({
            type: 'SET_LOADING'
        })
        try {
            const res = await axios.get(url);
            const products = await res.data;


            dispatch({
                type: 'SET_API_DATA',
                payload: products
            })
        } catch (error) {
            console.log(error)
            dispatch({
                type: 'API_ERROR',

            })

        }

    }
    //my 2nd api call for single product
    const getSingleProduct = async (url) => {
        dispatch({
            type: 'SET_SINGLE_LOADING'
        })
        try {
            const res = await axios.get(url);
            const singleProduct = await res.data;
            dispatch({
                type: 'SET_SINGLE_PRODUCT',
                payload: singleProduct
            })
            dispatch({
                type: 'SET_IMAGE_ARR',
                payload: singleProduct
            })

            // console.log(initialState.productImgArr)
        } catch (error) {
            dispatch({
                type: 'SET_SINGLE_ERROR'
            })
        }
    }

    useEffect(() => {
        getProductData(API);
    }, [])
    return (
        <ProductContext.Provider value={{ ...state, getProductData, getSingleProduct }}>
            {props.children}
        </ProductContext.Provider>
    )
}

export default ProductState
