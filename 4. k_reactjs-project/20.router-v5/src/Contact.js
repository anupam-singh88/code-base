import React from "react";
import { Link } from "react-router-dom";
export default function Contact() {
  return (
    <div>
      <h1>Contact Page</h1>
      <Link to="/home">home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
    </div>
  );
}
