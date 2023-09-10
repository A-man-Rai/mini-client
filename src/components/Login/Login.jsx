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
import { setLogin,setRegistered,setError } from '../../store/slices/LoginSlice';
import { useDispatch,useSelector} from "react-redux";
import { setUserId,setUserName,setEmail,setMessage,setToken } from '../../store/slices/responseDataSlice';
import Profile from './Profile';
import CircularLoading from './CircularLoading';
export default function Login() {
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
        password: ''
  });

  const handleChange = (e) => {
    changeError(false);
    changeMessage(" ");
    const { id, value } = e.target;
    setInput(prevState => ({
        ...prevState, 
        [id]: value    
    }));
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
        password: ''
    });
  };

  const handleClose = () => {
    setOpen(false);
  
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleLoginClick = async () => {
      try { 
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
      }
  };
  


   

   const handleRegisterClick=async()=>{
    try {
      const response = await axios.post('http://localhost:9000/register',input);
        const {user,message,token,}=response.data;
        const {id,email,userName}=user;
        console.log(response);
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
        console.log(error);

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
};

useEffect(() =>{
  if(message==="Logged in Successfull"){
      
      setOpen(false);
   }
}, [message]); 


  return (
    <div>
    {isLogin?<Profile  username={userName}/>:
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
         
          {isRegistered ? message : "LOGIN OR REGISTER " }

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
            
            {isError && <Typography>{message}</Typography>}

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
