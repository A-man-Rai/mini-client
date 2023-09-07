import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../store/slices/LoginSlice';
 function Profile({username}) {
  const [open, setOpen] = React.useState(false);
  const dispatch=useDispatch();


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    dispatch(setLogin(false));
    setOpen(false);
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
