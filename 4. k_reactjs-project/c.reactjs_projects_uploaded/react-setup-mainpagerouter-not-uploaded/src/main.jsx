import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import App from './App.jsx'
import Component1 from './components/Component1.jsx'
import Component2 from './components/Component2.jsx'
import Error from './components/Error.jsx'
import Param from './components/Param.jsx'
import AuthLayout from './components/AuthLayout.jsx'
import ProtectPage from './components/ProtectPage.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/component1",
        element: <Component1 />,
      },
      {
        path: "/component2",
        element: <Component2 />,
      },
      {
        path: "/params/:id",
        element: <Param />,
      },
      {
        path: "/protected",
        element: (
          <AuthLayout authentication>
            <ProtectPage />
          </AuthLayout>
        )

      },
      {
        path: "*",
        element: <Error />,
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
  </StrictMode>,
)
