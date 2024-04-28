import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Registration from './Registration';
import SuccessPage from './SuccessPage';
import Navbar from './Navbar';

const App = () => {
  return(
<>

   <BrowserRouter>
    <Navbar></Navbar>
    <Routes>
      <Route exact path='/' element={<Registration />} ></Route>
      <Route path='/success' element={<SuccessPage />} ></Route>
    </Routes>
  </BrowserRouter> 
  </>
  )
}

export default App;
