import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme } from '@mui/material/styles';
import axios from "axios";
import { Typography, styled } from '@mui/material';
import { setLogin,setRegistered,setError } from '../../store/slices/LoginSlice';
import { useDispatch,useSelector} from "react-redux";
import { setUserId,setUserName,setEmail,setMessage,setToken } from '../../store/slices/responseDataSlice';
import Profile from './Profile';
import CircularLoading from './CircularLoading';


export default function Login({stopWatching}) {
  const[open,setOpen]=useState(false);
  
  const dispatch = useDispatch();

//const userId = useSelector(state => state.responseData.user.id);
const userName = useSelector(state => state.responseData.user.userName);
//const Email = useSelector(state => state.responseData.user.email);
//const token = useSelector(state => state.responseData.token);
const message = useSelector(state => state.responseData.message);


const isError=useSelector(state=>state.login.isError);

  const isLogin=useSelector(state=>state.login.isLogin);
  const isRegistered=useSelector(state=>state.login.isRegistered);
  const login=(bool)=>{
    dispatch(setLogin(bool))
  }
  const registered=(bool)=>{
    dispatch(setRegistered(bool))
  }
  const changeError=(bool)=>{
    dispatch(setError(bool));
  }
  const changeUserId=(data)=>{
    dispatch(setUserId(data));
  }
  const changeUserName=(data)=>{
    dispatch(setUserName(data));
  }
  const changeEmail=(data)=>{
    dispatch(setEmail(data));
  }
  const changeToken=(data)=>{
    dispatch(setToken(data));
  }
  const changeMessage=(data)=>{
    dispatch(setMessage(data));
  }
  const [register,setRegister]=useState(false);

  const [input, setInput]=useState({
        email: '',
        username: '',
        password: '',
        otp:'',
  });
  const[emptyField,setEmptyField]=useState(false);
 const[isValidEmail,setIsValidEmail]=useState(true);
  const handleChange = (e) => {
    changeError(false);
    setEmptyField(false);
    changeMessage(" ");
    setEmailSent("");

    const { id,name,value } = e.target;
    setInput(prevState => ({
        ...prevState, 
        [id]: value    
    }));
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if the entered value is a valid email address
    if (name === 'email' && emailRegex.test(value)) {
      setInput((prevInput) => ({
        ...prevInput,
        [name]: value,
      }));
      setIsValidEmail(true)
    } else if (name === 'email') {
      // Handle invalid email input (you may display an error message)
      setIsValidEmail(false);
      console.log('Invalid email address');
    }
}; 
 
  const theme = useTheme();
  
 
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
    login(false);
    registered(false);
    changeUserId(" ");
    changeUserName(" ");
    changeEmail(" ");
    changeToken(" ")
    changeMessage(" ");
    setInput({
      email: '',
        username: '',
        password: '',
        otp:'',

    });
  };

  const handleClose = () => {
    setOpen(false);
    setIsValidEmail(true);
    setEmptyField(false);
    setEmailSent("");

  };

  const [isLoading, setIsLoading] = useState(false);
 
  const handleLoginClick = async () => {
   if(isValidEmail && input.password!=='' ){ try { 
         setIsLoading(true);
          
        const response = await axios.post('http://localhost:9000/login',input); 
        const {user,message,token,}=response.data;
        const {id,email,userName}=user;    
        changeMessage(message);
        changeToken(token)
        changeEmail(email);
        changeUserId(id);
        changeUserName(userName);
        login(true);
        registered(false);
        setIsLoading(false);
      } catch (error) {
          setIsLoading(false);
           changeError(true);
          console.error("There was an error!", error);
          const message=error.response.data.message;
          changeMessage(message);
      }}
      else{
        setEmptyField(true);
      }
  };
  
  
const ErrorMessage=styled(Typography)`
color:red;
`
const InvalidEmail=styled(Typography)`
color:red;
`
const RegisteredMessage=styled(Typography)`
color:green;
`
const EmptyField=styled(Typography)`
color:red;
`
const EmailSentMessage = styled(Typography)`
color: green;
`



const [emailSent,setEmailSent]=useState("");

const handleSendOtp = async () => {
  try {
    const response = await axios.post('http://localhost:9000/getotp', input, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
      validateStatus: (status) => {
        return true;
      },
    });

  console.log('Response from server:', response); // Log the entire response object

    if (response.data && response.data.message) {
      console.log('Message from server:', response.data.message); // Log the specific message
      setEmailSent(response.data.message);
    } else {
      console.error('Invalid response from server:', response);
    }
  } catch (error) {
    console.error('Error sending OTP:', error.response.data);
  }
};






   const handleRegisterClick=async()=>{
   if(isValidEmail &&  input.password!=='' && input.username!=='' && input.otp!==''){ 
    try {
      const response = await axios.post('http://localhost:9000/register',input);
        const {user,message,token}=response.data;
        const {id,email,userName}=user;
        console.log(response.data);
  
        changeMessage(message);
       
        changeToken(token);
         changeEmail(email);
         changeUserId(id);
         changeUserName(userName);
         handleToggleRegister();
         registered(true);
      } catch (error) {
        changeError(true);
        const message=error.response.data.message;
        changeMessage(message)
     } }
     else{
      setEmptyField(true);
     }
   };
   

  
   const handleToggleRegister = () => {
    setRegister(prev => !prev);
    changeError(false);
    setInput({
      email: '',
        username: '',
        password: ''
    });
    setIsValidEmail(true);
    setEmptyField(false);
    setEmailSent("");
};

useEffect(() =>{
  if(message==="Logged in Successfull"){
      
      setOpen(false);
   }
}, [message]); 

console.log(emailSent);


  return (
    <div>
    {isLogin?<Profile  username={userName} stopWatching={stopWatching}/>:
    <Button variant="contained" color='primary' onClick={handleClickOpen}>
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
         
          {isRegistered ? <RegisteredMessage>{message}</RegisteredMessage> : "LOGIN OR REGISTER " }

          </DialogContentText>
          <TextField
                autoFocus
                margin="dense"
                id="email"
                name="email"
                label="Email Address"
                type="email"
                fullWidth
                value={input.email}
                onChange={handleChange}
            />
            {isValidEmail ?<Typography></Typography> :<InvalidEmail>Invalid Email</InvalidEmail>}
            {isError && <ErrorMessage >{message}</ErrorMessage>}

            {register && (
  <TextField
    margin="dense"
    id="username"
    label="UserName"
    type="text"
    fullWidth
    value={input.username}
    onChange={handleChange}
  />
)}

{register && (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <TextField
      margin="dense"
      id="otp"
      label="OTP"
      name="otp"
      type="number"
      fullWidth
      value={input.otp || ''}
      onChange={handleChange}
    />
<EmailSentMessage>{emailSent}</EmailSentMessage>
    <Button
      onClick={handleSendOtp}
      size="small"
      variant="contained"
      color="success"
    >
      GET OTP
    </Button>
  </div>
)}

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
         {emptyField && <EmptyField>EMPTY FIELDS</EmptyField>}
          {isLoading && <CircularLoading/>}
          {!isRegistered  && <Link onClick={handleToggleRegister } 
          
        href="#" style={{ display: 'block', marginTop: '10px' }}>
           {register ? "SignUp" : "Register"} 
          </Link>
          }
        </DialogContent>
      </Dialog>
    </div>
  );
        }
