import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const routes = (
  <BrowserRouter>
    <Routes>
      <Route path='/dashboard' exact element={<Home/>}/>
      <Route path='/login' exact element={<Login/>}/>
      <Route path='/signup' exact element={<Signup/>}/>
    </Routes>
  </BrowserRouter>
);


const App = () => {
  return (
    <div>
      <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      draggable
      toastClassName="rounded-md p-3 mt-16 "
      />
      {routes}
    </div>
  )
}

export default App
