import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductContext from '../context/productContext';
import PageNavigation from './PageNavigation';
import './css/PageNavigation.css'
import FormatPrice from '../Helpers/FormatPrice'
import Stars from './Stars';
import AddCart from './AddCart';
import Loader from './Loader';

const API = 'https://api.pujakaitem.com/api/products?id='

const SingleProduct = () => {
    // const { nam } = CartContext();
    // console.log(nam)
    // for image selector
    const [imgNumber, setImageNumber] = useState(0)


    //retrieving the itemid from the url
    const { id } = useParams();

    // getting the function from our store
    const { getSingleProduct, singleProduct, isSingleLoading, productImgArr } = useContext(ProductContext)

    //destructuring the details
    const {
        id: alias,
        name, company, price, description, category, stock, stars, reviews, colors
    } = singleProduct
    const changeImgHandler = (imgId) => {
        setImageNumber(imgId)
    }
    let newPrice = price + 500
    // console.log(newPrice)



    useEffect(() => {
        getSingleProduct(`${API}${id}`);
    }, [])
    if (isSingleLoading || productImgArr.length === 0) {
        return (<Loader />)
    }


    return (
        <div>
            <PageNavigation name={name} />

            <div className="productBox">
                <div className="box1">

                    <img src={productImgArr[imgNumber].url} alt="" style={{ width: '100%' }} />
                    <div className="imgContainer">

                        {
                            productImgArr.map((curElm, id) => {
                                // console.log(curElm)
                                return (<img src={curElm.url} key={id} className='img' alt={curElm.filename} onClick={() => {
                                    changeImgHandler(id)
                                }} />)
                            })
                        }

                    </div>
                </div>
                <div className="box2">
                    <h1 className='prodName'>{name}</h1>
                    <Stars stars={stars} reviews={reviews} />
                    {/* <p className='review'>{stars} <span> ({reviews} customer reviews)</span></p> */}
                    <p className='price'> <strong>MRP : </strong> {
                        < FormatPrice price={newPrice} />}</p>
                    <p className='deal'>Deal of the Day : {<FormatPrice price={price} />}</p>
                    <p className='desc'>{description}</p>

                    <p>Available : <strong> In Stock</strong></p>
                    <p>Id: <strong>{alias}</strong></p>
                    <p>Brand: <strong> {company}</strong></p>
                    <hr />
                    <div className='color'>
                        <AddCart colors={colors} stock={stock} singleProduct={singleProduct} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleProduct;
