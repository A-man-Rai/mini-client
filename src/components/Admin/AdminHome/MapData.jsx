import React, { useEffect } from 'react'
import axios from 'axios'
import { useSelector,useDispatch } from 'react-redux'
import { useState } from 'react'
import {setData} from "../../../store/slices/adminLoginSlice.js"
import Tables from './Tables'
const MapData = () => {
    const dispatch=useDispatch();
    const [showTable,setShowTable]=useState(false);
    const data=useSelector(state=>state.adminLogin.data)
    useEffect(()=>{
      const fetchData = async () => {
        const response=await axios.get("http://localhost:9000") 
        dispatch(setData(response.data))
        setShowTable(true);
      }
      fetchData()
    },[data])

  return (
    <div>
      <h1>MAP DATA</h1>
     {showTable && <Tables/>} 
    </div>
  )
}

export default MapData
