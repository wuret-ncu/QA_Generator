import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Index from './Page/index';
import Read from './Page/readPage';
import Write from './Page/writePage';
import Analytic from './Page/analysis';
import Login from './Page/login';
import Register from './Page/register';
import ForgetPassword from './Page/forgetPassword';
import Navbar from './Component/Navbar';
import WritingScore from './Page/writingScore';
import ReadingScore from './Page/readingScore';
import History from './Page/history';

import './input.css'
import { ContextProvider } from './Contexts/Context';

// import reportWebVitals from './reportWebVitals';


function App() {
  return (
    <div>
      <ContextProvider>
        <Navbar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path='/read' element={<Read />}></Route>
            <Route path='/write' element={<Write />}></Route>
            <Route path='/analysis' element={<Analytic />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/writingScore' element={<WritingScore />}></Route>
            <Route path='/readingScore' element={<ReadingScore />}></Route>
            <Route path='/forgetPassword' element={<ForgetPassword />}></Route>
            <Route path='/history' element={<History />}></Route>
          </Routes>
        </BrowserRouter>
      </ContextProvider>
    </div>
  );
}

export default App;
