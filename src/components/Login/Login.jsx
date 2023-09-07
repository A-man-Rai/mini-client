import * as React from 'react';
import { useState ,useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import axios from "axios";
import { Typography } from '@mui/material';
import { setLogin,setRegistered } from '../../store/slices/LoginSlice';
import { useDispatch,useSelector} from "react-redux";
import Profile from './Profile';
export default function Login() {
  const[open,setOpen]=useState(false);
  
  const dispatch = useDispatch();
  const isLogin=useSelector(state=>state.login.isLogin);
  const isRegistered=useSelector(state=>state.login.isRegistered);
  const login=(bool)=>{
    dispatch(setLogin(bool))
  }
  const registered=(bool)=>{
    dispatch(setRegistered(bool))
  }

  const [register,setRegister]=useState(false);

  const [input, setInput]=useState({
        email: '',
        username: '',
        password: ''
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setInput(prevState => ({
        ...prevState,  // Spread the previous state to maintain other field values
        [id]: value    // Use the field's id to set the new value
    }));
};

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
    login(false);
    registered(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [loginResponseData, setLoginResponseData] = React.useState(null);
  
  const handleLoginClick = async () => {
      try {
        console.log(input);
        const response = await axios.post('http://localhost:9000/login',input); 
        setLoginResponseData(response.data);
        handleToggleRegister();
      } catch (error) {
          console.error("There was an error!", error);
      }
  };
  console.log(loginResponseData);


   
  const [registerResponseData, setRegisterResponseData] = React.useState(null);

   const handleRegisterClick=async()=>{
    try {
      console.log(input);
      const response = await axios.post('http://localhost:9000/register',input);
        setRegisterResponseData(response);
        handleToggleRegister();
        registered(true);
      } catch (error) {
      console.error('Error posting data:', error);
    }
   };
   

  
   const handleToggleRegister = () => {
    setRegister(prev => !prev);
    setInput({
      email: '',
        username: '',
        password: ''
    });
};

useEffect(() => {
    setOpen(false);
    if(loginResponseData){
        login(true);
    }
   
}, [loginResponseData]);  

/**useEffect(() => {
  if(registerResponseData){
      console.log(registerResponseData);
  }
 
}, [registerResponseData]); **/

  return (
    <div>
    {isLogin?<Profile username={loginResponseData.user.userName}/>:
    <Button variant="contained" onClick={handleClickOpen}>
      LOGIN       
       </Button>}
      
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        fullWidth
        PaperProps={{
          style: {
            width: '80%', // Adjust the width as required
            maxHeight: '70%', // Adjust the height as required
          },
        }}
      >
        <DialogTitle id="responsive-dialog-title">
          {register ?"REGISTER " : "LOGIN"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
          {isRegistered ? registerResponseData.data.message : "LOGIN OR REGISTER " }
          </DialogContentText>
          <TextField
                autoFocus
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                fullWidth
                value={input.email}
                onChange={handleChange}
            />
           {register && <TextField
                margin="dense"
                id="username"
                label="UserName"
                type="text"
                fullWidth
                value={input.username}
                onChange={handleChange}
            />}
            <TextField
                margin="dense"
                id="password"
                label="Password"
                type="password"
                fullWidth
                value={input.password}
                onChange={handleChange}
            />
          <Button onClick={register ?handleRegisterClick :handleLoginClick} variant="contained" color="primary" style={{ marginTop: '15px' }}>
           {register ?"Register" :"Login"} 
          </Button> 
          <Link onClick={handleToggleRegister } 
          
          href="#" style={{ display: 'block', marginTop: '10px' }}>
           {register ? "SignUp" : "Register"} 
          </Link>
        </DialogContent>
      </Dialog>
    </div>
  );
}
