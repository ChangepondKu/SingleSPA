import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

const Root = () => {

  return (
    <Router>
      <div className='p-5'>
        <main className="container py-4 ">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default Root
