export const reducer = (state, action) => {
    switch (action.type) {
        case 'REMOVE_ITEM':
            return {
                ...state,
                item: state.item.filter((curElem) => {
                    return curElem.id !== action.payload;
                }),
            }
        case 'CLEAR':
            return {
                ...state,
                item: []
            }
        case 'INCREMENT_ITEM':
            const updatedIncCart = state.item.map((curElem) => {
                if (curElem.id === action.payload) {
                    return { ...curElem, quantity: curElem.quantity + 1 };
                }
                return curElem;
            });

            return { ...state, item: updatedIncCart };

        case 'DECREMENT_ITEM':
            const updatedCart = state.item
                .map((curElem) => {
                    if (curElem.id === action.payload) {
                        return { ...curElem, quantity: curElem.quantity - 1 };
                    }
                    return curElem;
                })
                .filter((curElem) => curElem.quantity !== 0);
            return { ...state, item: updatedCart };

        case 'GET_TOTAL':
            let { totalItem, totalAmount } = state.item.reduce(
                (accum, curVal) => {
                    let { price, quantity } = curVal;

                    let updatedTotalAmount = price * quantity;
                    accum.totalAmount += updatedTotalAmount;

                    accum.totalItem += quantity;
                    return accum;
                },
                {
                    totalItem: 0,
                    totalAmount: 0,
                }
            );
            return { ...state, totalItem, totalAmount };

        case "ASC":
            let asc = (state.item.sort((a, b) => {
                return a.price - b.price
            }))

            return { ...state, item: asc };
        case "DSC":
            let dsc = (state.item.sort((a, b) => {
                return b.price - a.price
            }))

            return { ...state, item: dsc };
        case "A2Z":
            let a2z = (state.item.sort((a, b) => {
                return a.title.localeCompare(b.title);
            }))
            console.log(a2z)
            return { ...state, item: a2z };
        case "Z2A":
            let z2a = (state.item.sort((a, b) => {
                return b.title.localeCompare(a.title);
            }))

            return { ...state, item: z2a };
    }
}