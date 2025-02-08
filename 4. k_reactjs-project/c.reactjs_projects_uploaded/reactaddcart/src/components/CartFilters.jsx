import React, { useContext } from 'react'
import ItemContext from '../context/ItemContext'

const CartFilters = () => {
    const { sortAsc, sortDsc, sortA2Z, sortZ2A } = useContext(ItemContext);
    // console.log(sortAsc())
    const priceHandler = () => {
        let priceOption = (document.getElementById('sorting').value);
        if (priceOption === "asc") {
            sortAsc();
        }
        if (priceOption === "dsc") {
            sortDsc();
        }
        if (priceOption === "a2z") {
            sortA2Z();
        }
        if (priceOption === "z2a") {
            sortZ2A();
        }
    }
    return (
        <div>
            <h4>Cart Filters</h4>
            <div className="filter">
                <select name="sorting" id="sorting" onClick={priceHandler}>
                    <option value="none">Price Range </option>
                    <option value="asc">Low To High</option>
                    <option value="dsc">High To Low</option>
                    <option value="a2z">a-z</option>
                    <option value="z2a">z-a</option>
                </select>


            </div>
        </div>
    )
}

export default CartFilters
