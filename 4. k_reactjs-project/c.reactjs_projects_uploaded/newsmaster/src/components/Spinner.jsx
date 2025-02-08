import React from 'react'
import loader from './loader.gif'

export default function Spinner() {
    let loaderLink = 'loader.gif'
    return (
        <div className='container text-center'>
            <img src={loader} alt="" style={{ width: "70px" }} />
            {/* <h1>From spinner</h1> */}
        </div>
    )
}
