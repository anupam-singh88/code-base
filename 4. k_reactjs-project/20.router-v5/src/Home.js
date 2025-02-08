import React from "react";
import './App.css'
import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <p>my home page</p>
      <NavLink to="/home">home</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/contact">Contact</NavLink>
    </div>
  );
}
