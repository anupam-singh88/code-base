import React, { useContext } from 'react'
import './css/Listitem.css'
import ProductContext from '../context/ProductContext'
import { NavLink } from 'react-router-dom'
import FormatPrice from '../Helpers/FormatPrice'
import { useFilterContext } from '../context/FilterCotnext'


const ListView = () => {
    const { products, isLoading } = useContext(ProductContext)
    const { filter_products } = useFilterContext();

    return (
        <>
            {
                isLoading ? "<h1>...loading</h1>" :
                    filter_products.map((curElm, index) => {
                        return (
                            <div className="listview" key={index}>
                                <figure className='listItem'>
                                    <img src={curElm.image} className="featureImg" alt={curElm.name} />
                                    <figcaption className="caption">
                                        <div className='secBox'>
                                            <h1 className='listTitle'>{curElm.name}</h1>
                                            <p className='listPrice'>{<FormatPrice price={curElm.price} />}</p>
                                            <p className='listdesc'>{curElm.description.slice(0, 90)}...</p>
                                            <div>
                                                <NavLink to={`/singleproduct/${curElm.id}`}>
                                                    <button className="listBTn">Read More</button>
                                                </NavLink>
                                            </div>
                                        </div>
                                    </figcaption>
                                </figure>
                            </div>
                        )
                    })


            }

        </>
    )
}

export default ListView
