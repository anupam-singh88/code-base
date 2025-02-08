{ { color: '#b2d72d' } } import React from 'react'

const Stars = ({ stars, reviews }) => {
    const ratingStar = Array.from({ length: 5 }, (elem, index) => {
        let number = index + 0.5;
        return <span key={index}>
            {
                stars >= index + 1 ? (<i className="fa-solid fa-star" style={{ color: 'orange' }}></i>) : stars >= number ? <i className="fa-solid fa-star-half-stroke" style={{ color: 'orange' }}></i> : (<i className="fa-regular fa-star" style={{ color: 'orange' }}></i>)
            }
        </span>
    })

    return (
        <div>

            <p> {ratingStar}   ({reviews} customer reviews)</p>
        </div>
    )
}

export default Stars
