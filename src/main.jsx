import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Help from './pages/help/help.jsx'
import { ErrorPage } from './pages/error/error-page.jsx'

const router = createBrowserRouter([
  {path: '/', element: <App />, errorElement: <ErrorPage />,},
  {path: 'help', element: <Help />},
  {path: 'error-page', element: <ErrorPage />},
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
