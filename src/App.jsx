import Layout from './pages/Layout';
import Main from './pages/Main';
import Info from './pages/Info';
import About from './pages/About';
import NotFound from './pages/NotFound';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

function App() {
  const brewPath = '/brewery_locator'
  return (
    <Routes>
      <Route path={`${brewPath}/`} element={<Layout/>} >
        <Route index element={<Main/>}/>
        <Route path={`${brewPath}/brewery/:id`} element={<Info />}/>
        <Route path={`${brewPath}/about/`} element={<About />}/>
        <Route path='/brewery_locator/*' element={<NotFound />}/>
      </Route>
    </Routes>
  );
}

export default App;
