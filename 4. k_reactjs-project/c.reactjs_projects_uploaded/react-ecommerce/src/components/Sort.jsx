import React from 'react'
import './css/filterSection.css'
import { useFilterContext } from '../context/FilterCotnext'
import FormatPrice from '../Helpers/FormatPrice'


const Sort = () => {
    const { filters: { text, category, color, price, maxPrice, minPrice },
        updateFilterValue,
        all_products,
        clearFilters, } = useFilterContext();


    // get the unique values of each property
    const getUniqueData = (data, attr) => {
        let newVal = data.map((curElem) => {
            return curElem[attr];
        });
        // console.log(newVal)
        if (attr === "colors") {
            // return (newVal = ["All", ...new Set([].concat(...newVal))]);
            newVal = newVal.flat();
        }

        return (newVal = ["all", ...new Set(newVal)]);
    };

    const categoryData = getUniqueData(all_products, "category");
    const companyData = getUniqueData(all_products, "company");
    const colorsData = getUniqueData(all_products, "colors");
    return (
        <div>
            <div style={{ margin: '12px 0' }}>
                <form onSubmit={(e) => {
                    e.preventDefault();
                }}>
                    <input type="text" placeholder='SEARCH' name="text" id="searchBox" value={text} className='inp' onChange={updateFilterValue} />
                </form>
            </div>
            <div className="catCont">
                <h4>Category</h4>
                <br />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {categoryData.map((curElem, index) => {
                        return (
                            <button
                                key={index}
                                type="button"
                                name="category"
                                value={curElem}
                                className={curElem === category ? "catP act" : "catP"}
                                onClick={updateFilterValue}>
                                {curElem}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="catComp">
                <h3>Company</h3>

                <form action="#">
                    <select
                        name="company"
                        id="company"
                        className='inps'
                        onClick={updateFilterValue}>
                        {companyData.map((curElem, index) => {
                            return (
                                <option key={index} value={curElem} name="company">
                                    {curElem}
                                </option>
                            );
                        })}
                    </select>
                </form>
            </div>

            <div className="catColor">
                <h3>Colors</h3>

                {/* <p>Color : <span className='col1'>red</span></p> */}
                {colorsData.map((curColor, index) => {
                    if (curColor === "all") {
                        return (
                            <button
                                key={index}
                                type="button"
                                value={curColor}
                                name="color"
                                className="al"
                                onClick={updateFilterValue}>
                                all
                            </button>
                        );
                    }
                    return (
                        <button
                            key={index}
                            type="button"
                            value={curColor}
                            name="color"
                            style={{ backgroundColor: curColor }}
                            className={color === curColor ? "btnStyle active" : "btnStyle"}
                            onClick={updateFilterValue}>
                            {/* {color === curColor ? <FaCheck className="checkStyle" /> : null} */}
                        </button>
                    );
                })}

            </div>

            <div className="byslide">
                <h3>Price</h3>
                <p>
                    <FormatPrice price={price} />
                </p>
                <input
                    type="range"
                    name="price"
                    min={minPrice}
                    max={maxPrice}
                    value={price}
                    onChange={updateFilterValue}
                />
            </div>
            <div className="catBtn">

                <button className="inps" onClick={clearFilters}>
                    Clear Filters
                </button>
            </div>
        </div>
    )
}

export default Sort
