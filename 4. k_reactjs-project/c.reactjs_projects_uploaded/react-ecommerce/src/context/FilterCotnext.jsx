import { createContext, useContext, useEffect, useReducer } from "react";
import ProductContext from './ProductContext'
import reducer from '../reducer/FilterReducer'
const FilterContext = createContext();

const initialState = {
    filter_products: [],
    all_products: [],
    grid_view: true,
    sorting_value: "low",
    filters: {
        text: "",
        category: "all",
        company: "all",
        color: "all",
        maxPrice: 0,
        price: 0,
        minPrice: 0,
    },
};

export const FilterContextProvider = ({ children }) => {
    const { products } = useContext(ProductContext)
    const [state, dispatch] = useReducer(reducer, initialState);
    //set Grid view
    const setGridView = () => {
        return (dispatch({
            type: 'SET_GRID_VIEW',
        }))
    }

    //set list view
    const setListView = () => {
        return (
            dispatch({
                type: 'SET_LIST_VIEW'
            })
        )
    }

    // sorting function
    const sorting = (eVal) => {
        dispatch({ type: "GET_SORT_VALUE", payload: eVal });
    };

    // update the filter values
    const updateFilterValue = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        // console.log(name, value)

        return dispatch({ type: "UPDATE_FILTERS_VALUE", payload: { name, value } });
    };

    // to clear the filter
    const clearFilters = () => {
        dispatch({ type: "CLEAR_FILTERS" });
    };

    // to sort the product
    useEffect(() => {
        dispatch({ type: "FILTER_PRODUCTS" });
        dispatch({ type: "SORTING_PRODUCTS" });
    }, [products, state.sorting_value, state.filters]);
    // console.log(state.filter_products)

    useEffect(() => {
        dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products });
    }, [products])

    return (
        <FilterContext.Provider value={{ ...state, setGridView, setListView, sorting, updateFilterValue, clearFilters }}>
            {children}
        </FilterContext.Provider>
    );
}

//created a custom hook
export const useFilterContext = () => {
    return useContext(FilterContext);
}