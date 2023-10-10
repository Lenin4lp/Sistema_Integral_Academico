import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/login/Login.jsx';
import Home from './pages/home/Home.jsx';
import Courses from './pages/courses/Courses.jsx';
import Library from './pages/library/Library.jsx';
import Support from './pages/support/Support.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login/>,
  },
  {
    path: '/home',
    element: <Home/>
  },
  {
    path: '/cursos',
    element: <Courses/>
  },
  {
    path: '/biblioteca',
    element: <Library/>
  },
  {
    path: '/soporte',
    element: <Support/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
