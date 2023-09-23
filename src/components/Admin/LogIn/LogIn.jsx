import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setEmail,setAdminId,setAdminName,setMessage,setToken,setLogin } from '../../../store/slices/adminLoginSlice.js';
import axios from "axios"
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function Copyright(props) {
 
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function LogIn() {
  const dispatch=useDispatch();
  const isLogin=useSelector(state=>state.adminLogin.isLogin);
  const message=useSelector(state=>state.adminLogin.message);
  const [showMessage,setShowMessage]=useState(false);
  let navigate=useNavigate();
  const [data,setData]=useState({
    email:"",
    password:"",
  })
  const handleSubmit = async(event) => {
    event.preventDefault ();
    try{
      const responseData =await axios.post('http://localhost:9000/admin/login',data);
      console.log(responseData.data);
      if(responseData.data.message==="invalid credentials"){
        setShowMessage(true);
        dispatch(setMessage(responseData.data.message));
        return;
      }
        const {message,token,user}=responseData.data;
        const{id,email,userName}=user;
        dispatch(setAdminId(id));
        dispatch(setAdminName(userName));
        dispatch(setEmail(email));
        dispatch(setMessage(message));
        dispatch(setToken(token));
        dispatch(setLogin(false));
       
    }
   catch(err){
    console.log(err.message);
   }
  };

  const handleText=(event)=>{
    dispatch(setMessage(""));
   setShowMessage(false);
    const { id, value } = event.target;
    setData(prevState => ({
      ...prevState, 
      [id]: value    
  }));
  }
  useEffect(() => {
    if (isLogin) {
      navigate("/admin/home");
    }
  }, [isLogin, navigate]);

  return (<>
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            A
          </Avatar>
          <Typography component="h1" variant="h5">
            ADMIN
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={data.email}
              onChange={handleText}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={data.password}
              onChange={handleText}
            />
            {showMessage && message}<br/>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              LOG IN
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
    </>
  );
}