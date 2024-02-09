import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from './store/store.js'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'

const router=createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'login',
        element:<LoginPage/>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>,
)
