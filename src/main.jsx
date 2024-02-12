import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import './index.css'
import store from './store/store.js'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'
import SignUp from './pages/SignUp.jsx'
import HomePage from './pages/HomePage.jsx'
import BlogPage from './pages/BlogPage.jsx'
import WriteBlogs from './pages/WriteBlogs.jsx'
import ReadBlog from './pages/ReadBlog.jsx'

const router=createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'',
        element:<HomePage/>
      },
      {
        path:'login',
        element:<LoginPage/>
      },
      {
        path:'signup',
        element:<SignUp/>
      },
      {
        path:'blogs',
        element:<BlogPage/>
      },
      {
        path:'write',
        element:<WriteBlogs/>
      },
      {
        path:'blogs/:id',
        element:<ReadBlog/>
      },
      {
        path:'write/:id',
        element:<WriteBlogs/>
      }
    ]
  }
]);

ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
