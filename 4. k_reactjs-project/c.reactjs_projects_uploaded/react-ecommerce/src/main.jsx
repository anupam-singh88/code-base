import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ProductState from './context/ProductState.jsx'
import { FilterContextProvider } from './context/FilterCotnext.jsx'
// import { CartProvider } from './context/CartContext.jsx'
import CartState from './context/CartState.jsx'
import { Auth0Provider } from '@auth0/auth0-react';


const domain = (import.meta.env.VITE_REACT_APP_AUTH_DOMAIN);

const clientId = (import.meta.env.VITE_REACT_APP_CLIENT_ID)
console.log(domain)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      {/* <CartProvider> */}
      <ProductState>
        <FilterContextProvider>
          <CartState>
            <App />
          </CartState>
        </FilterContextProvider>
      </ProductState>
      {/* </CartProvider> */}
    </Auth0Provider>
  </React.StrictMode>,
)
