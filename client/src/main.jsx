import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Testing from './pages/Testing.jsx'

import {createBrowserRouter, RouterProvider} from "react-router-dom"
import HomePage from './pages/Home.jsx'
import NotFoundPage from './pages/NotFound.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element: <HomePage />
  },
  {
    path:"/testing",
    element: <Testing />
  },
  {
    path: "*",
    element: <NotFoundPage />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {router} />
  </StrictMode>,
)
