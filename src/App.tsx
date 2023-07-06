
import './App.css'

  import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage.tsx'
import Pricing from './pages/Pricing'
import Product from './pages/Product'
import PageNotFound from './pages/PageNotFound'
import Login from "./pages/Login.tsx";


function App() {


  return (
<Routes>
  <Route path='/' element={<HomePage/>}/>
  <Route path='/product' element={<Product/>}/>
  <Route path='/pricing' element={<Pricing/>}/>
  <Route path='/login' element={<Login/>}/>
  <Route path='*' element={<PageNotFound/>}/>

</Routes>




  )
}

export default App
