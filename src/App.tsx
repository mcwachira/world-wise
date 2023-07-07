
import './App.css'

  import {Routes, Route, Navigate} from 'react-router-dom'
import HomePage from './pages/HomePage.tsx'
import Pricing from './pages/Pricing'
import Product from './pages/Product'
import PageNotFound from './pages/PageNotFound'
import Login from "./pages/Login.tsx";
import AppLayout from "./pages/AppLayout.tsx";
import Form from "./components/Form.tsx";
import CityList from "./components/CityList.tsx";
import CountryList from "./components/CountryList.tsx";
import {useEffect, useState} from "react";
import axios from 'axios'
import City from "./components/City.tsx";


function App() {


  return (
<Routes>
  <Route path='/' element={<HomePage/>}/>

  <Route path='/product' element={<Product/>}/>
  <Route path='/pricing' element={<Pricing/>}/>
  <Route path='/login' element={<Login/>}/>
  <Route path='*' element={<PageNotFound/>}/>
  <Route path='app' element={<AppLayout/>}>

    <Route index element={<Navigate replace to='cities'/>}/>
    <Route path='cities' element={<CityList/>}/>
    <Route path='cities/:id' element={<City />}/>
    <Route path='countries' element={<CountryList/>}/>
    <Route path='form' element={<Form/>}/>

  </Route>
</Routes>




  )
}

export default App
