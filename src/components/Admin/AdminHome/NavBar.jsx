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
import { setEmail,setAdminId,setAdminName,setMessage,setToken,setLogin } from '../../../store/slices/adminLoginSlice.js';

export default function ButtonAppBar() {
    let navigate=useNavigate();
  const isLogin=useSelector(state=>state.adminLogin.isLogin);
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
            News
          </Typography>
          <Button color="inherit" onClick={handleClick}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
