import React, { useContext, useEffect } from 'react'
import FilterSection from './FilterSection'
import ProductGrid from './ProductGrid'
import ListView from './ListView'
import Sort from './Sort'
import './css/ProductList.css'
import { useFilterContext } from '../context/FilterCotnext'
import ProductContext from '../context/ProductContext'



const Products = () => {
    const { products } = useContext(ProductContext);
    const { setGridView, grid_view } = useFilterContext();
    // console.log(grid_view)

    useEffect(() => {
        setGridView()
        // console.log(a)
    }, [products])
    return (
        <div className='sortGrid'>
            <div className='b1'>
                <Sort />
            </div>
            <div className='b2'>
                <FilterSection />
                <div>
                    {grid_view ? <div className="productpage"> <ProductGrid /> </div> : <div className="listpage">
                        {<ListView />}
                    </div>}

                </div>

            </div>
        </div>
    )
}

export default Products
