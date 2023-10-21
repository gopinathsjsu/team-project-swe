import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeContainer from './containers/homeContainer';
import MainContainer from './containers/mainContainer';

const App = () => {
  return (
    <BrowserRouter basename='/'>
      
      <Routes>
        <Route path='/home' Component={HomeContainer}/>
        <Route path='/' Component={MainContainer}/>

      
      </Routes>
    </BrowserRouter>

    
  )
}

export default App