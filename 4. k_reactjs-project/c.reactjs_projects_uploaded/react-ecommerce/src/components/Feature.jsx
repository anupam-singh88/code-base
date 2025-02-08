import React, { useContext, useEffect } from 'react'
import './css/Feature.css'
import ProductContext from '../context/productContext'
import Product from './Product';
import Loader from './Loader';

const Feature = () => {
    const { featureProducts, isLoading } = useContext(ProductContext);

    return (
        <>

            <div className="featureContainer">
                <div className="itmBox" style={{ textAlign: 'center' }}>
                    <h1>Feature Products</h1>
                </div>
                <div className="boxFe">

                    {isLoading ? <Loader /> : featureProducts.map((elm, id) => {

                        return (<div className="featureItem" key={id} >
                            <Product elm={elm} />
                        </div>)
                    })
                    }


                </div>
            </div>
        </>
    )
}

export default Feature
