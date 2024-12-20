import React from 'react'
import Navbar from '../src/component/Navbar'

import {Routes, Route} from "react-router-dom"
import PortfolioDesign from './Pages/Portfolio_design'
import About from './Pages/About'
import Home from './Pages/Home'


function App() {
  return (
    <div className='hide-scrollbar'>
      
      <div className="shadow-slate-500">
        <Navbar />
      </div>

      <Routes>
        <Route path = "/" element = {<Home/>} />
        <Route path='/About' element= {<About/>} />
        <Route path='/Design_Portfolio' element= {<PortfolioDesign/>} />
      </Routes>
    </div>
  )
}

export default App
