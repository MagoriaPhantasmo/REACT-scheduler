import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";



import 'bootstrap/dist/css/bootstrap.min.css'
import ReactDOM from "react-dom";
import logo from './logo.svg';


import './App.css';

import  LandingPage  from './components/LandingPage'


//<Route path="/edit" element={<UserEditor user="Man" />} />
//
const App = () => {
  //console.log(import.meta.env.cool);
  //console.log(window.EMULATION);
  
  return (
    
      
        <BrowserRouter>
          <div className='App'>
            
            <LandingPage />
          </div>
        </BrowserRouter>
      
    
  )
  
};

export default App;
