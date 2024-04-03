import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Topbor from './Components/Topbor';
import Slids from './Components/Slids';
import Product from './Components/Product.js';
import Cart from './Components/Cart.js';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { UserProvider } from './Components/Context/Context.js';
import Checkout from './Components/Checkout.js';



function App() {
  const [cart, setCart] = useState([])

  const fetchCart = () => {
    axios.get('https://660030b3df565f1a6145f0af.mockapi.io/cart').then((res) => {
      setCart(res.data);
    }).catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    fetchCart()
  }, [])



  return (
    <BrowserRouter>
      <UserProvider value={cart}>
        <Topbor></Topbor>
        <Slids />
        <Routes>
          <Route path='/' element={<Product cart={cart} setcart={setCart} ></Product>} />
          <Route path='/Cart' element={<Cart headercart={cart} setHeadercart={setCart}></Cart>} />
          <Route path='/Checkout' element={<Checkout />} />
        </Routes>
        <Toaster></Toaster>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
