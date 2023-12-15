import React, { useState,useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import axios from 'axios';

import {useSelector } from 'react-redux';

function NewReportForm() {


  const [formData, setFormData] = useState({
    title: '',
    description: '',
    latitude: '',
    longitude: ''
  });
 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
  };

  const token = useSelector(state => state.responseData.token);
 
  const handleClick=async()=>{
   try{
    const response = await axios.post('http://localhost:9000/login/report',formData,{
      headers: {
        'Authorization': `Bearer ${token}`
       }  
     });
    const message=response.data.message;
    console.log(message);
    setFormData({
    title: '',
    description: '',
    latitude: '',
    longitude: ''
    })
   }
   catch(error){
    console.log(error);
   }
     }

  const getLocation=()=>{
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }
  navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData({
          ...formData,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        
          })
      },
      (error) => {
        alert('Location permission denied');      
        console.warn(`ERROR(${error.code}): ${error.message}`);
      }
  ) 
  }
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 300 }}>
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
    <Button variant='contained' onClick={getLocation}>GET CURRENT LOCATION</Button>
  
    <Button onClick={handleClick} type="submit" variant="contained" color="primary">
        Submit
      </Button>
   
      
       
      
    </Box>
  );
}

export default NewReportForm;
