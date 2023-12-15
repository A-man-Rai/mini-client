import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { setLogin ,setNotify,setLatitude, setLongitude} from '../../store/slices/LoginSlice';
import { setUserId,setUserName,setEmail,setMessage,setToken } from '../../store/slices/responseDataSlice';
import { useDispatch} from "react-redux";
import { setLoggedStatus,setMapStatus,setInfoStatus } from '../../store/slices/HomeSlice';
import { setArray } from '../../store/slices/UserReportsSlice'; 
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import LogoutIcon from '@mui/icons-material/Logout';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { blue } from '@mui/material/colors';

function Profile({username,stopWatching}) {
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
  const justClose=()=>{
        setOpen(false);
      }
      const handleSetInfoStatus = (bool) => {
        dispatch(setInfoStatus(bool));
      };
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
   dispatch(setLatitude(""))
   dispatch(setLongitude(""))
   dispatch(setNotify(false))
   stopWatching();
   handleSetInfoStatus(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        {username}
      </Button>
      <Dialog open={open} onClose={justClose}>
        
        <List sx={{ pt:0}}>
          <ListItem >
          <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                 <LogoutIcon/>
                </Avatar>
          </ListItemAvatar>
            <ListItemButton onClick={handleClose}>
              <ListItemText primary="LOGOUT" />
            </ListItemButton>
          </ListItem>
        </List>

      </Dialog>
    </div>
  );
}

export default Profile;
