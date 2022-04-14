import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Buyer from '../page/Buyer';
import Landing from '../page/Landing';
import Seller from '../page/Seller';

const Layout = () => {
  return (
    <Router fallback={<span />}>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/seller" element={<Seller/>}/>
        <Route path="/buyer" element={<Buyer/>} />
      </Routes>
    </Router>
  )
}

export default Layout