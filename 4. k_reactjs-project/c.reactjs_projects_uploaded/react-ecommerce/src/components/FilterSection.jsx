import React from 'react'
import './css/filtersection.css'
import { useFilterContext } from '../context/FilterCotnext'

const FilterSection = () => {
    const { filter_products, grid_view, setGridView, setListView, sorting } =
        useFilterContext();

    return (
        <>
            <div className="cont">

                <div className="viewOps">
                    <i className={grid_view ? "fa-solid fa-grip grid list" : "fa-solid fa-grip grid"} onClick={() => {
                        setGridView();
                    }}></i>
                    <i className={grid_view ? "fa-solid fa-list " : "fa-solid fa-list list"} onClick={() => {
                        setListView();
                    }}></i>
                </div>
                <div>
                    <p>{`${filter_products.length} Product Available`}</p>
                </div>
                <div>
                    <select name="filter" id="filter" className='inp' onChange={(e) => {
                        // console.log(e.target.value)
                        sorting(e.target.value);
                    }}>
                        <option value="low">Price (Low to High)</option>
                        <option value="high">Price (Hight to Low)</option>
                        <option value="a2z">Price (A - Z)</option>
                        <option value="z2a">Price (Z - A)</option>

                    </select>
                </div>
            </div>
        </>
    )
}

export default FilterSection
