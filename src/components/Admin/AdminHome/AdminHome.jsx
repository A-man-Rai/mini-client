import React from 'react'
import {  useSelector } from 'react-redux/es/hooks/useSelector'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import NavBar from "./NavBar"
const AdminHome = () => {
  let navigate=useNavigate();
  const isLogin=useSelector(state=>state.adminLogin.isLogin);
 
  return (
    <>
    {isLogin ? 
    <div>
       <NavBar></NavBar>
      <h1>ADMIN HOME</h1>
    </div>
    :
     useEffect(()=>{
     navigate("/admin")
     }) }
    </>
  )
}

export default AdminHome
