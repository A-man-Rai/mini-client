import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState,useEffect } from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { updateReport } from '../../store/slices/UserReportsSlice'; 
import { setUpdateId } from '../../store/slices/showUpdateButton';
export default function Edit({ onClick }) {
  const [open, setOpen] = useState(false);
 const update=useSelector(state=>state.updateButton)
 const token = useSelector(state => state.responseData.token);
const dispatch=useDispatch();
 const updateId=update.updateId;
  const handleClickOpen = () => {
    setOpen(true);
  };
 

  const handleClose = () => {
    setOpen(false);
    dispatch(setUpdateId(" "))
  };

 const handleUpdate=async()=>{
    handleClose();
    
    try{
    const response = await axios.patch(`http://localhost:9000/login/report/${updateId}`,formData,{
        headers: {
          'Authorization': `Bearer ${token}`
         }
      })

      dispatch(updateReport(response.data))
      console.log(response.data);
    }
    catch(error){
        console.log(error);
    }
 }

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    latitude: '',
    longitude: ''
  });
  const selectReportById = (state, reportId) => 
    state.userReports.find(report => report._id === reportId);

  const report = useSelector(state => selectReportById(state, updateId));
 
  useEffect(() => {
    if (updateId) { 
        getUpdateData();
    }
   }, [updateId]);

  const handleClick =  () => {
    handleClickOpen();
    onClick(); // sets id of object which needs to be updated
};

  const getUpdateData=()=>{
    if(report){
    const{title,description,latitude,longitude}= report
    setFormData({ title, description, latitude, longitude });
    }
  }
 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
 
  return (
    <div>
      <Button variant="outlined" onClick={handleClick}>
        EDIT
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>EDIT</DialogTitle>
        <DialogContent>
          <TextField 
        label="Title" 
        name="title" 
        value={formData.title} 
        onChange={handleChange}
        />
       <TextField 
        label="Description" 
        name="description" 
        value={formData.description} 
        onChange={handleChange}
        multiline
        rows={4}
     />
      <TextField 
        label="Latitude" 
        name="latitude" 
        type="number"
        value={formData.latitude} 
        onChange={handleChange}
     />
      <TextField 
        label="Longitude" 
        name="longitude" 
        type="number"
        value={formData.longitude} 
        onChange={handleChange}
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdate}>SAVE</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
