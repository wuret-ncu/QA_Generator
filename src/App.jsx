import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Index from './Page/index';
import Read from './Page/readPage';
import Write from './Page/writePage';
import Analytic from './Page/analysis';
import Login from './Page/loginPage';
import Register from './Page/register';
import Navbar from './Component/Navbar';
import './input.css'
// import reportWebVitals from './reportWebVitals';


function App() {
  return (
  <div>
    <Navbar />
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path='/read' element={<Read />}></Route>
            <Route path='/write' element={<Write />}></Route>
            <Route path='/analysis' element={<Analytic />}></Route>
            <Route path='/logout' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
        </Routes>
      </BrowserRouter>
      </div>
  );
}

export default App;
