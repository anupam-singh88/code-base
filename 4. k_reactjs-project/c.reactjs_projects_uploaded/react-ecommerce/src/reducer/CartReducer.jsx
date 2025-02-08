const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_CART':
            let existingProduct = state.cart.find(
                (curItem) => curItem.id === action.payload.id + action.payload.singleProduct.colors[action.payload.colrNum]
            );

            if (existingProduct) {
                let newArr = { ...existingProduct, max: existingProduct.max + action.payload.amount };

                let updatedProduct = state.cart.map((curElm) => {
                    if (curElm.id === action.payload.singleProduct.id + action.payload.singleProduct.colors[action.payload.colrNum]) {

                        let newMax = curElm.max + action.payload.amount;

                        if (newMax > curElm.stock) {
                            // console.log('exceed')
                            alert('Stock Limit Exceeded')
                            newMax = curElm.max;
                        }
                        return {
                            ...curElm,
                            max: newMax
                        }
                    }
                    return curElm

                });
                return {
                    ...state,
                    cart: updatedProduct,
                };
            } else {
                let selectedItm = {
                    ...action.payload.singleProduct,
                    max: action.payload.amount,
                    colors: [action.payload.singleProduct.colors[action.payload.colrNum]],
                    id: action.payload.id + action.payload.singleProduct.colors[action.payload.colrNum],
                    // id: new Date().getTime(),
                    image: [action.payload.singleProduct.image[0]]
                }
                return {
                    ...state,
                    cart: [...state.cart, selectedItm],
                };
            }


        case 'SET_INCREMENT':
            let updatedProduct = state.cart.map((curElm) => {
                if (curElm.id === action.payload) {
                    let incAmount = curElm.max + 1;
                    if (incAmount > curElm.stock) {
                        incAmount = curElm.stock
                        alert("Stock limit exceeded")
                    }
                    return {
                        ...curElm,
                        max: incAmount,
                    };
                }
                return curElm;
            })
            return { ...state, cart: updatedProduct }

        case 'SET_DECREMENT':
            let updatedPrd = state.cart.map((curElm) => {
                if (curElm.id === action.payload) {
                    let descAmount = curElm.max - 1;
                    if (descAmount < 1) {
                        descAmount = 1
                        alert("Minimum 1 item required")
                    }
                    return {
                        ...curElm,
                        max: descAmount,
                    };
                }
                return curElm;
            })
            return { ...state, cart: updatedPrd }


        case 'SET_TOTAL_ITEM':
            const totItm = action.payload.reduce((accum, curElm) => {
                return curElm.max + accum
            }, 0)
            return {
                ...state,
                total_item: totItm
            }
        case 'SET_TOTAL_PRICE':
            const totPrc = action.payload.reduce((accum, curElm) => {

                return (curElm.price * curElm.max) + accum
            }, 0)

            return {
                ...state,
                total_price: totPrc
            }

        case 'DELETE_ITEM':

            let newCart = state.cart.filter((curElm) => {
                return curElm.id !== action.payload
            })

            return {
                ...state,
                cart: newCart
            }
        case 'CLEAR_CART':



            return {
                ...state,
                cart: []
            }
        default:
            return state
    }
}

export default reducer;