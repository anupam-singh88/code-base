import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./About";
import Contact from "./Contact";
import Home from "./Home";
import User from "./User";
import Error from './Error'

export default function App() {
  return (
    <div>
      <h1>Learning react router dom</h1>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          {/* //nested route */}
          <Route path="/contact" element={<Contact />}>

            {/* <Route path="/about" element={<About />}></Route> */}
          </Route>
          <Route path="/user/:fname/:lname" element={<User />}></Route>
          <Route path="*" element={<Error />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
