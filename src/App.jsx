/*import { useState } from 'react'
import reactLogo from './assets/react.svg'*/
import { createBrowserRouter, RouterProvider, Routes, Route, Router, Outlet, useRoutes, Navigate, useNavigate } from 'react-router-dom'
import './App.css'
import Home from './page/home/home'
import Login from './page/auth/login.jsx'
import NotFount from './page/NotFound'
import Perfil from './page/home/Perfil'
import Products from './page/Products/Products'
import Category from './page/Categories/Category'
//import Section from './page/home/section'
import Users from './page/Users/Users'
//import AddProducts from './components/Products/AddProducts'
import { AuthLayout, Loged } from './components/AuthLoayout'
/*import AddCategory from './components/Category/AddCategory'
import AddUser from './components/Users/AddUsers'
import EditCategory from './components/Category/EditCategory'
import EditProduct from './components/Products/EditProduct'*/
import HomeView from './page/home/homeview'
import Imagen from './page/home/Imagen'
import Bill from './page/factura/bill'

function App() {
  const getItem = localStorage.getItem("Token");
  /*const routesnew= useRoutes([
    {
      path: "/",
      element: <Home/>,
      children: [
        {
          path: "login",
          element: <Login/>
        }
      ]
    }
  ])*/
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        {
          index: true,
          element: <HomeView />
        },
        {
          element: <AuthLayout />,
          children: [
            {
              path: "product",
              children: [
                {
                  index: true,
                  element: <Products />,
                },
              ]
            },
            {
              path: "category",
              element: <Category />,
            },
            {
              path: "users",
              children: [
                {
                  index: true,
                  element: <Users />
                },
              ]
            },
            {
              path: "bill",
              element: <Bill/>
            },
            {
              path: "perfil",
              element: <Perfil />
            },
            {
              path: "imagen",
              element: <Imagen />
            }
          ]
        }
      ]
    },
    {
      element: <Loged />,
      children: [
        {
          path: "login",
          children: [
            {
              index: true,
              element: <Login />
            },
          ]
        },
      ]
    },
    {
      path: "*",
      element: <NotFount />,
    },
  ]);
  return <RouterProvider router={router} />
}

export default App;
