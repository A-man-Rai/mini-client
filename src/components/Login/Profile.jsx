import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { setLogin } from '../../store/slices/LoginSlice';
import { setUserId,setUserName,setEmail,setMessage,setToken } from '../../store/slices/responseDataSlice';
import { useDispatch} from "react-redux";
import { setLoggedStatus,setMapStatus } from '../../store/slices/HomeSlice';
import { setArray } from '../../store/slices/UserReportsSlice'; 
function Profile({username}) {
  const [open, setOpen] = React.useState(false);
  const dispatch=useDispatch();
  
  const isLogged=(bool)=>{
    dispatch(setLoggedStatus(bool))
  }
  const showMap=(bool)=>{
    dispatch(setMapStatus(bool))
  }

  const handleClickOpen = () => {
    setOpen(true);
  };
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
  const setUserReport=(data)=>{
    dispatch(setArray(data))
      }

  const handleClose = () => {
    setUserReport([]);
    dispatch(setLogin(false));
    isLogged(false);
    showMap(true);
    setOpen(false);
   changeUserId("")
   changeUserName(" ")
   changeMessage(" ")
   changeToken(" ")
   changeEmail (" ")
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        {username}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogActions>
          <Button onClick={handleClose}>Logout</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Profile;
