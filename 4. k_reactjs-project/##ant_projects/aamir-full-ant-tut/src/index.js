import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './ResposiveNavbar';
import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <AntTable /> */}
    {/* <App /> */}
    {/* <AntForm /> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);




