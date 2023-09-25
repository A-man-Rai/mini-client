import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Fab } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from "axios"
import EditIcon from '@mui/icons-material/Edit';
export default function Edit({updateId}) {

  const [open, setOpen] = useState(false);
  
     const selectMapDataById= (state, mapDataId) => 
    state.adminLogin.data.find(mapData => mapData._id === mapDataId);

  const mapData = useSelector(state => selectMapDataById(state, updateId));
  
  const handleClickOpen = () => {
    setOpen(true);
   if(mapData){
    const{title,description,latitude,longitude}= mapData
    setTextData({title, description, latitude, longitude });
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const tokens=useSelector(state=>state.adminLogin.token);

  const handleUpdate=async()=>{
    const response=await axios.patch(`http://localhost:9000/admin/maps/${updateId}`,textData,{
        headers: {
          'Authorization': `Bearer ${tokens}`
         }
      })
      console.log(response);
      setTextData({
        title:" ",
        description:"",
        latitude:"",
        longitude:""
      })

      handleClose();

  }

  const [textData,setTextData]=useState({
    title:" ",
    description:"",
    latitude:"",
    longitude:""
  });

  const handleText=(event)=>{
    const { id, value } = event.target;
    setTextData(prevState => ({
      ...prevState, 
      [id]: value    
  }));
  }
  return (
    <div>
       <Fab onClick={handleClickOpen} color="secondary" aria-label="edit">
                <EditIcon />
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
          <Button onClick={handleUpdate}>UPDATE</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}