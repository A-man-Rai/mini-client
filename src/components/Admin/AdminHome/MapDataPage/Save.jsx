import React from 'react'
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import axios from "axios"
const Save = ({reportId}) => {
     const data=useSelector(state=>state.adminLogin.data) ;
    const selectReportDataById= (state, reportId) => 
 state.adminLogin.data.find(report=> report._id === reportId);
 const reportData = useSelector(state => selectReportDataById(state, reportId)) 
 const tokens=useSelector(state=>state.adminLogin.token);
 
const handleSave=async()=>{
console.log(reportData);
const {title,description,latitude,longitude}=reportData;
const textData={
    title:title,
    description:description,
    latitude:latitude,
    longitude:longitude
}

const response=await axios.post("http://localhost:9000/admin/maps",textData,{
    headers: {
      'Authorization': `Bearer ${tokens}`
     }
  })
  alert("SAVED SUCCESSFULLY");
}

  return (
    <Button onClick={handleSave} variant="contained"  color='success'>
        SAVE
    </Button>
  )
}

export default Save
