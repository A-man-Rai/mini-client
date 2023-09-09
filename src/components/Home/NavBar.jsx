import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ReplyIcon from '@mui/icons-material/Reply';
import Login from '../Login/Login';
import { useDispatch ,useSelector} from "react-redux";
// Update imported action creator names
import { setMapStatus, setInfoStatus, setLoggedStatus } from "../../store/slices/HomeSlice";
import { setShowReport } from '../../store/slices/GetAllReportSlice';

export default function NavBar(){
  const dispatch = useDispatch();
  
  const isLogin = useSelector(state => state.login.isLogin);


  const setShowAllReport=(bool)=>{
    dispatch(setShowReport(bool))
  }

  // Use the updated action creator names
  const handleSetMapStatus = (bool) => {
    dispatch(setMapStatus(bool));
  };

  const handleSetInfoStatus = (bool) => {
    dispatch(setInfoStatus(bool));
  };

  const handleSetLoggedStatus = (bool) => {
    dispatch(setLoggedStatus(bool));
  };




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
            onClick={() => {
              handleSetMapStatus(true);
              handleSetInfoStatus(false);
              handleSetLoggedStatus(false);
              setShowAllReport(false);
            }}
          >
            <ReplyIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ACCIDENT 
          </Typography>
          
        { isLogin &&
          <Button 
            color="inherit"
            onClick={() => {
              handleSetLoggedStatus(true);
              handleSetMapStatus(false);
              handleSetInfoStatus(false);
            }}
          >
            Report Us
          </Button> }  
          <Login />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
