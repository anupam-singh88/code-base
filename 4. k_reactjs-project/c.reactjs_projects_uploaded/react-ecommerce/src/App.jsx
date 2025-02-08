import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Products from './components/Products'
import Contact from './components/Contact'
import Cart from './components/Cart'
import ErrorPage from './components/Error'
import SingleProduct from './components/SingleProduct'
import Header from './components/Header'
import Footer from './components/Footer'
import './components/css/Home.css'



const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <div className="mainContainer">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/products' element={<Products />} />
          <Route path='/singleproduct/:id' element={<SingleProduct />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </div>
      <Footer />

      {/* <h1>React Ecommerce App</h1> */}
    </BrowserRouter>
  )
}

export default App
