import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeUser } from '../store/slices/UserSlice'
const DisplayUsers = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => {
        return state.users;
    })
    const deleteUser = (user) => {
        dispatch(removeUser(user));
    }
    // const deleteUser = (id) => {
    //     dispatch(removeUser(id));
    // }
    console.log(data)
    return (
        <>
            {
                data.map((user, id) => {
                    return <li key={id}>
                        {user}
                        <button className='btn btn-delete' onClick={() => {
                            // deleteUser(id)
                            deleteUser(user)
                        }}>delete me</button>
                    </li>
                })
            }

        </>
    )
}

export default DisplayUsers
