import React, { useContext } from 'react'
import ProductContext from '../context/ProductContext'
import Product from './Product'
import './css/ProductList.css'
import { useFilterContext } from '../context/FilterCotnext'
import Loader from './Loader';

const ProductGrid = () => {
    const { products, isLoading } = useContext(ProductContext)

    const { filter_products } = useFilterContext();
    // console.log(filter_products)

    return (
        <>
            {
                isLoading ? <Loader /> :
                    filter_products.map((elm, id) => {
                        return (<div className='prodItem' key={id} >
                            <Product elm={elm} />
                        </div>)
                    })
            }
        </>
    )
}

export default ProductGrid
