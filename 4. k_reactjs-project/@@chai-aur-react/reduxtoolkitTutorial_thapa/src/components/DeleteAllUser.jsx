import React from "react";
import styled from "styled-components";
// import { clearAllUser } from '../store/slices/UserSlice';
import { clearAllUsers } from '../store/actions/index';
import { useDispatch } from 'react-redux'

const DeleteAllUser = () => {
  const dispatch = useDispatch();

  const deleteUsers = () => {
    dispatch(clearAllUsers())
    // dispatch(clearAllUser())
  }
  return <Wrapper><div><button className="clear-btn" onClick={deleteUsers}>DeleteAllUser</button></div></Wrapper>;
};
const Wrapper = styled.section`.clear-btn{
  text-transform: capitalize;
  background-color: #db338a;
  margin-top: 2rem;
  padding: 10px;
  font-size: 22px;
  color: white;
  border: none;
}`

export default DeleteAllUser