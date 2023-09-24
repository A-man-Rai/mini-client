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
import { setShowReport,setCreateData } from '../../store/slices/GetAllReportSlice';

export default function NavBar(){
  const dispatch = useDispatch();
  
  const isLogin = useSelector(state => state.login.isLogin);


  const showAllReport=(bool)=>{// to get all report of user
    dispatch(setShowReport(bool))
  }
  const createNewReport=(bool)=>{ // for new report 
     dispatch(setCreateData(bool))
  }

  const handleSetMapStatus = (bool) => {// to make map visible
    dispatch(setMapStatus(bool));
  };

  const handleSetInfoStatus = (bool) => {// to make map pointer details visible
    dispatch(setInfoStatus(bool));
  };

  const handleSetLoggedStatus = (bool) => {// to make report us visible
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
              createNewReport(false);
              showAllReport(false);
            }}
          >
            <ReplyIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ACCIDENT 
          </Typography>
          
        { isLogin &&
          <Button 
          variant="contained"
            color="success"
            sx={{ mr: 2 }} 
            onClick={() => {
              handleSetLoggedStatus(true);
              handleSetMapStatus(false);
              handleSetInfoStatus(false);
             
            }}
          >
            Report Us
          </Button> }  
          <Login  />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
