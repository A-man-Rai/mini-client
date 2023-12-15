import React from 'react'
import {  useSelector } from 'react-redux/es/hooks/useSelector'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import NavBar from "./NavBar"
import MapData from './MapData';
import UsersData from "./UsersData"
import ReportsData from "./ReportsData"
const AdminHome = () => {
  let navigate=useNavigate();
  const isLogin=useSelector(state=>state.adminLogin.isLogin);
  const showMapData=useSelector(state=>state.adminLogin.showMapData);
  const showUsersData=useSelector(state=>state.adminLogin.showUsersData);
  const showReportsData=useSelector(state=>state.adminLogin.showReportsData);

  return (
    <>
    {isLogin ? 
    <div>
       <NavBar></NavBar>
      {showMapData && <MapData></MapData>}
      {showUsersData && <UsersData></UsersData>}
      {showReportsData && <ReportsData showReportUpdateButton={showReportsData} ></ReportsData>}
    </div>
    :
     useEffect(()=>{
     navigate("/admin")
     }) }
    </>
  )
}

export default AdminHome
