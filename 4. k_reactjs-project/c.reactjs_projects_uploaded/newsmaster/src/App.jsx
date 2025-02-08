import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import LoadingBar from 'react-top-loading-bar'

export default function App() {
  const apiKey = '33f1b18501d24bd0b10638a3ba52fac7';
  const pageSize = 6;
  const [progress, setProgress] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Navbar mode='dark' title='NewsMaster' />
        {/* <LoadingBar
          color='#f11946'
          height={3}
          progress={progress}
        // onLoaderFinished={() => setProgress(0)}
        /> */}
        <Routes>
          <Route path='/' element={<Home setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} key='general' country='in' category='general' />} />

          <Route path='/business' element={<Home setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} key='general' country='in' category='business' />} />

          <Route path='/entertainment' element={<Home setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} key='general' country='in' category='entertainment' />} />

          <Route path='/general' element={<Home setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} key='general' country='in' category='general' />} />

          <Route path='/health' element={<Home setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} key='general' country='in' category='health' />} />

          <Route path='/science' element={<Home setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} key='general' country='in' category='science' />} />

          <Route path='/sports' element={<Home setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} key='general' country='in' category='sports' />} />

          <Route path='/technology' element={<Home setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} key='general' country='in' category='technology' />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}
