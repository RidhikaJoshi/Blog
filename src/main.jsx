import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import './index.css'
import store from './store/store.js'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {lazy}  from 'react'


const HomePage = lazy(()=>import('./pages/HomePage.jsx'));
const BlogPage = lazy(()=>import('./pages/BlogPage.jsx'));
const WriteBlogs = lazy(()=>import('./pages/WriteBlogs.jsx'));
const ReadBlog = lazy(()=>import('./pages/ReadBlog.jsx'));
const LoginPage = lazy(()=>import('./pages/LoginPage.jsx'));
const SignUp = lazy(()=>import('./pages/SignUp.jsx'));
const MyProfile = lazy(()=>import('./pages/MyProfile.jsx'));

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
      },
      {
        path:'profile',
        element:<MyProfile/>
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
