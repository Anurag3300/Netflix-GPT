import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Login from './Login'
import Browse from './Browse'
import { RouterProvider } from 'react-router-dom'

const Body = () => {
    const appRouter = createBrowserRouter([
        {
            path:"/",
            element:<Login/>
        },
        {
            path:"Browes",
            element:<Browse/>
        }
    ])
  return (
    <RouterProvider router={appRouter}/>
  )
}

export default Body