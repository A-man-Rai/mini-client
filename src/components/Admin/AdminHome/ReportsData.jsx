import React from 'react'
import ReportsTable from './ReportsTable'
import { useDispatch ,useSelector} from 'react-redux';
import { useEffect } from 'react';
import {setData} from "../../../store/slices/adminLoginSlice.js"
import axios from 'axios';
const ReportsData = ({showReportUpdateButton}) => {
  const token=useSelector(state=>state.adminLogin.token);
  
  const dispatch=useDispatch();
  const data=useSelector(state=>state.adminLogin.data)

  useEffect(()=>{
    const fetchData = async () => {
      const response=await axios.get("http://localhost:9000/admin/reports",{
        headers: {
          'Authorization': `Bearer ${token}`
         }
      }) 
      dispatch(setData(response.data))
    }
    fetchData()
  },[])
  return (
    <div>
      <h1>REPORT</h1>
      <ReportsTable showReportUpdateButton={showReportUpdateButton}></ReportsTable>
    </div>
  )
}

export default ReportsData
