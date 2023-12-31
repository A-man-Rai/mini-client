import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios"
import {setData} from "../../../../store/slices/adminLoginSlice.js"



export default function Add() {
  const dispatch=useDispatch();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const tokens=useSelector(state=>state.adminLogin.token);
 const data=useSelector(state=>state.adminLogin.data);
  const handleSave=async()=>{
    const response=await axios.post("http://localhost:9000/admin/maps",textData,{
        headers: {
          'Authorization': `Bearer ${tokens}`
         }
      })
      setTextData({
        title:" ",
        description:"",
        latitude:"",
        longitude:"",
      })
      const res=await axios.get("http://localhost:9000")
      dispatch(setData(res.data))
     
     

      handleClose();

  }


  

  const handleText=(event)=>{
    const { id, value } = event.target;
    setTextData(prevState => ({
      ...prevState, 
      [id]: value    
  }));
  }
  const [textData,setTextData]=useState({
    title:" ",
    description:"",
    latitude:"",
    longitude:"",
  });


  return (
    <div>
      <Fab onClick={handleClickOpen}  style={{float: 'right'}} color="primary" aria-label="add">
        <AddIcon />
     </Fab>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>ADD DATA</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleText}
            value={textData.title}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="standard"
            onChange={handleText}
            value={textData.description}
          />
          <TextField
            autoFocus
            margin="dense"
            id="latitude"
            label="Latitude"
            type="number"
            fullWidth
            variant="standard"
            onChange={handleText}
            value={textData.latitude}
          />
          <TextField
            autoFocus
            margin="dense"
            id="longitude"
            label="Longitude"
            type="number"
            fullWidth
            variant="standard"
            onChange={handleText}
            value={textData.longitude}
          />
      
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave}>SAVE</Button>
        </DialogActions>
      </Dialog>
    </div>
  );

  }
