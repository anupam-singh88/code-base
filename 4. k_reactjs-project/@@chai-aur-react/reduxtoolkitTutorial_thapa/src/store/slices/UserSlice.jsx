import { createSlice } from '@reduxjs/toolkit'
import { clearAllUsers } from '../actions/index';
// console.log("use")
const userSlice = createSlice({
    name: "user",
    initialState: [],
    reducers: {
        addUser(state, action) {
            state.push(action.payload)
        },
        removeUser(state, action) {
            // state.pop(action.payload)
            // state.splice(action.payload, 1)
            let userIndex = state.indexOf(action.payload);
            state.splice(userIndex, 1)
        },
        clearAllUser(state, action) {
            // return state = [];
            return [];
        }
    },
    extraReducers(builder) {
        builder.addCase(clearAllUsers, () => {
            return [];
        })
        // builder.addCase(userSlice.actions.clearAllUser, () => {
        //     return [];
        // })
    }
})


// if action is supposed to handled by one reducer,use reducers
// if action is supposed to be handled by multiple reducers, use extrareducers

// console.log(userSlice.actions)
// export { userSlice }
export default userSlice.reducer

export const { addUser, removeUser, clearAllUser } = userSlice.actions;
