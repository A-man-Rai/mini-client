import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import {setShowUserData,setShowReportsData,setShowMapData, setEmail,setAdminId,setAdminName,setMessage,setToken,setLogin } from '../../../store/slices/adminLoginSlice.js';
import {setData} from "../../../store/slices/adminLoginSlice.js"
import axios from "axios"
export default function ButtonAppBar() {
    let navigate=useNavigate();
  const isLogin=useSelector(state=>state.adminLogin.isLogin);
  const token=useSelector(state=>state.adminLogin.token);

   const dispatch=useDispatch();
  const handleClick=()=>{
    dispatch(setAdminId(""));
        dispatch(setAdminName(""));
        dispatch(setEmail(""));
        dispatch(setMessage(""));
        dispatch(setToken(""));
       dispatch(setLogin(""));
       navigate("/admin")
  }
 
   
 
  const handleMapData=async()=>{   // to render maps data
    const response=await axios.get("http://localhost:9000") 
    dispatch(setData(response.data))
    dispatch(setShowMapData(true));
    dispatch(setShowReportsData(false));
    dispatch(setShowUserData(false));
  }
  const handleGetAllUsers=async()=>{
    const response=await axios.get("http://localhost:9000/admin/users",{
        headers: {
          'Authorization': `Bearer ${token}`
         }
      })
    dispatch(setData(response.data))
}
  const handleUsersData=()=>{ // to render Users 
    handleGetAllUsers();
    dispatch(setShowMapData(false));
    dispatch(setShowReportsData(false));
    dispatch(setShowUserData(true));
  }
  
  const handleGetAllReports=async()=>{
    const response=await axios.get("http://localhost:9000/admin/reports",{
        headers: {
          'Authorization': `Bearer ${token}`
         }
      })
      console.log(response);
    dispatch(setData(response.data))
}

  const handleReportData=()=>{ // to render Users 
    handleGetAllReports();
    dispatch(setShowMapData(false));
    dispatch(setShowReportsData(true));
    dispatch(setShowUserData(false));
  }


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ADMIN
          </Typography>
        
          <Button variant="contained"  sx={{ mr: 2 }} onClick={handleMapData} color="success">Maps Data</Button>
          <Button variant="contained"  sx={{ mr: 2 }} onClick={handleUsersData} color="success">Users</Button>
          <Button variant="contained"  sx={{ mr: 2 }} onClick={handleReportData} color="success">Reports</Button>
          <Button color="inherit" onClick={handleClick}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
