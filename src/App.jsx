import Layout from './pages/Layout';
import Main from './pages/Main';
import Info from './pages/Info';
import About from './pages/About';
import NotFound from './pages/NotFound';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout/>} >
        <Route index element={<Main/>}/>
        <Route path='brewery/:id' element={<Info />}/>
        <Route path='about/' element={<About />}/>
        <Route path='*' element={<NotFound />}/>
      </Route>
    </Routes>
  );
}

export default App;
