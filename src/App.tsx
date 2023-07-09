
import './App.css'
import {lazy, Suspense} from "react";
  import {Routes, Route, Navigate} from 'react-router-dom'
// import HomePage from './pages/HomePage.tsx'
// import Pricing from './pages/Pricing'
// import Product from './pages/Product'
// import PageNotFound from './pages/PageNotFound'
// import Login from "./pages/Login.tsx";
// import AppLayout from "./pages/AppLayout.tsx";
import Form from "./components/Form.tsx";
import CityList from "./components/CityList.tsx";
import CountryList from "./components/CountryList.tsx";

import City from "./components/City.tsx";
import ProtectedRoute from './pages/ProtectedRoute'
import SpinnerFullPage from "./components/SpinnerFullPage.tsx";



const  HomePage = lazy(() => import ('./pages/HomePage'))
const  Pricing = lazy(() => import ('./pages/Pricing'))
const  Product = lazy(() => import ('./pages/Product'))
const  PageNotFound = lazy(() => import ('./pages/PageNotFound'))
const  Login = lazy(() => import ('./pages/Login'))
const  AppLayout = lazy(() => import ('./pages/AppLayout'))



function App() {


  return (

    <Suspense fallback={<SpinnerFullPage/>}>
        <Routes>
        <Route path='/' element={<HomePage/>}/>

        <Route path='/product' element={<Product/>}/>
        <Route path='/pricing' element={<Pricing/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='*' element={<PageNotFound/>}/>
        <Route path='app' element={<ProtectedRoute>
            <AppLayout/>
        </ProtectedRoute>
        }
        >

            <Route index element={<Navigate replace to='cities'/>}/>
            <Route path='cities' element={<CityList/>}/>
            <Route path='cities/:id' element={<City />}/>
            <Route path='countries' element={<CountryList/>}/>
            <Route path='form' element={<Form/>}/>

        </Route>

        </Routes>

    </Suspense>






  )
}

export default App


