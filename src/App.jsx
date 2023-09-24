import MyForm from '../src/components/Report/MyForm';
import './App.css';
import Home from './components/Home/Home';
import * as React from "react";
import ErrorPage from './components/Home/ErrorPage';
import Admin from "./components/Admin/Admin"
import AdminHome from "./components/Admin/AdminHome/AdminHome"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    errorElement: <ErrorPage />, 
  },
  {
    path:"/admin",
    element:<Admin></Admin>,
    errorElement: <ErrorPage />, 
  },
  {
    path:"/admin/home",
    element:<AdminHome></AdminHome>,
    errorElement: <ErrorPage />, 
  },
  {
    path:"*",
    element:<Admin></Admin>
  }
]);

function App(){
return (
      <div className="App">
             <RouterProvider router={router} />
      </div>
  );
}

export default App;
