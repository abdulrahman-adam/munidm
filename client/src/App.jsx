import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home';
import {Toaster } from "react-hot-toast"

import { Route, Routes, useLocation } from 'react-router-dom'
import Contact from './pages/Contact'
import Footer from './components/Footer';
import Login from './components/Login';
import { useAppContext } from './context/AppContext';
import AllProducts from './pages/AllProducts';
import ProductCategory from './pages/ProductCategory';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import AddAddress from './pages/AddAddress';
import MyOrders from './pages/MyOrders';
import AdminLogin from './components/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AddProduct from './pages/admin/AddProduct';
import ProductList from './pages/admin/ProductList';
import Orders from './pages/admin/Orders';
import Loading from './components/Loading';
// import AddCategory from './pages/admin/AddCategory';
import ListCategory from './pages/admin/ListCategory';
import AddCategory from './pages/admin/AddCategory';

import 'bootstrap-icons/font/bootstrap-icons.css';
import ContactList from './pages/admin/ContactList';
const App = () => {

  // The state of is the user seller or not
  const isSellerPath = useLocation().pathname.includes("admin");
  // Getting the showUserLogin from AppContext
  const {showUserLogin, isSeller} = useAppContext();
  const { pathname } = useLocation();
  const { setShowUserLogin } = useAppContext();

  // Every time the URL (pathname) changes, hide the login modal
  useEffect(() => {
    setShowUserLogin(false);
  }, [pathname, setShowUserLogin]);



  
  return (
    <div className='text-default min-h-screen text-gray-700 bg-white'>
      {isSellerPath ? null : <Navbar />}
      {showUserLogin ? <Login /> : null}
      <Toaster position="top-center"
    toastOptions={{
    success: {
      style: {
        background: "#4caf50",
        color: "#fff",
      },
    },
    error: {
      style: {
        background: "#f44336",
        color: "#fff",
      },
    },
  }}
/>
    {/* <div className={`${isSellerPath ? "" : " px-3 md:px-6 lg:px-16 xl:px-16"}`}> */}
    <div className={`${isSellerPath ? "" : "mx-0 px-0"}`}>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/products' element={<AllProducts/>}/>
        <Route path='/products/:category' element={<ProductCategory/>}/>
        <Route path='/products/:category/:id' element={<ProductDetails/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/add-address' element={<AddAddress/>}/>
        <Route path='/my-orders' element={<MyOrders/>}/>
        <Route path='/loader' element={<Loading/>}/>

        <Route path='/admin' element={isSeller ? <AdminLayout /> : <AdminLogin/>}>
        <Route index element={isSeller ? <AddProduct />: null}/>
        <Route path='product-list' element={<ProductList />}/>
        <Route path='orders' element={<Orders />}/>
        <Route path='add-category' element={<AddCategory />}/>
        <Route path='category-list' element={<ListCategory />}/>
        <Route path='all-contact' element={<ContactList />}/>
        </Route>
      </Routes>
    </div> 
       {!isSellerPath && <Footer />}
    </div>
  )
}

export default App
