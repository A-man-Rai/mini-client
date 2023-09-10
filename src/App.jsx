import MyForm from '../src/components/Report/MyForm';
import './App.css';
import Home from './components/Home/Home';
import * as React from "react";
import ErrorPage from './components/Home/ErrorPage';
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
]);

function App(){
return (
      <div className="App">
             <RouterProvider router={router} />
      </div>
  );
}

export default App;
