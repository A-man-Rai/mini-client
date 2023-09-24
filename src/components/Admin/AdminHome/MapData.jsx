import React from 'react'
import axios from 'axios'
import { useSelector,useDispatch } from 'react-redux'
import { useState } from 'react'
import {setData} from "../../../store/slices/adminLoginSlice.js"
import Tables from './Table'
const MapData = () => {
    const token=useSelector(state=>state.adminLogin.token);
    const dispatch=useDispatch();
    const [showTable,setShowTable]=useState(false);
    const handleGetAllUsers=async()=>{
        const response=await axios.get("http://localhost:9000/admin/users",{
            headers: {
              'Authorization': `Bearer ${token}`
             }
          })
        dispatch(setData(response.data))
          setShowTable(true);
    }

    const handleGetAllMapData=async()=>{
        const response=await axios.get("http://localhost:9000") 
        dispatch(setData(response.data))
    }
  return (
    <div>
      <h1>MAP DATA</h1>
      <button onClick={handleGetAllUsers}>GET ALL USERS</button>
      <button onClick={handleGetAllMapData}>GET ALL MAP DATA</button>
      {showTable && <Tables/> } 
    </div>
  )
}

export default MapData
