import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import './App.css'
export default function About() {
  const Navigate = useNavigate();
  const goToHome = ()=>{
    Navigate('/')
  }
  return (
    <div>
      <p>About Compoonen</p>
      <NavLink to="/home">home</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/contact">Contact</NavLink>

      <button  onClick={goToHome}>Return Home</button>
      <button  onClick={()=>{
        Navigate(-1)
      }}>Go back</button>
    </div>
  );
}
