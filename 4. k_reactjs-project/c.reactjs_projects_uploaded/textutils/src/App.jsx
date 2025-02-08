import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Alert from './components/Alert'


export default function App() {
  const [mode, setMode] = useState('light');
  const [alert, setAlert] = useState(null);
  const [textStyle, setTextStyle] = useState({
    color: 'black',
  })
  const [bodyStyle, setBodyStyle] = useState({
    color: 'black',
    // backgroundColor: 'purple',
    // height: "100vh"
  })
  const showAlert = (type, message) => {
    setAlert({
      type: type,
      msg: message
    })
    setTimeout(() => {
      setAlert(null)
    }, 1000);
  }
  const toggleMode = () => {
    showAlert("success", "Dark mode has been enabled");
    if (mode === 'light') {
      setMode('dark')
      setTextStyle({
        color: 'white',
      });
      setBodyStyle({
        color: 'white',
      })
      document.getElementById('root').style.backgroundColor = '#3636a2';
      document.getElementById('exampleFormControlTextarea1').style.backgroundColor = '#3636a2';
      document.getElementById('exampleFormControlTextarea1').style.color = 'white';
      setTimeout(() => {
        setAlert(null)
      }, 1000);
    } else {
      setMode('light')
      setTextStyle({
        color: 'black',
      });
      setBodyStyle({
        color: 'black',
      })
      document.getElementById('root').style.backgroundColor = 'white';
      document.getElementById('exampleFormControlTextarea1').style.backgroundColor = 'white';
      document.getElementById('exampleFormControlTextarea1').style.color = 'dark';
      setAlert(null)
      showAlert("success", "Light mode has been enabled");
      setTimeout(() => {
        setAlert(null)
      }, 1000);
    }
  }
  return (
    <>
      <BrowserRouter>
        <Navbar mode={mode} title='TextUtils' toggleMode={toggleMode} textStyle={textStyle} />
        <Alert alert={alert} />
        <Routes>
          <Route path='/' element={<Home toggleMode={toggleMode} mode={mode} bodyStyle={bodyStyle} showAlert={showAlert} />} />
          <Route path='/about' element={<About />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}
