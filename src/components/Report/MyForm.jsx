import * as React from 'react';
import { Box , Button} from '@mui/material';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import {  useSelector , useDispatch} from 'react-redux';
import { setMapStatus, setInfoStatus, setLoggedStatus } from "../../store/slices/HomeSlice";
import { setShowReport ,setCreateData} from '../../store/slices/GetAllReportSlice';
import axios from "axios";
import { setArray } from '../../store/slices/UserReportsSlice';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function MyForm() {
  const dispatch=useDispatch();

  const token = useSelector(state => state.responseData.token);

  
 const setUserReport=(data)=>{
dispatch(setArray(data))
  }

  const handleSetMapStatus = (bool) => { // make map visivle
    dispatch(setMapStatus(bool));
  };
  
  const handleSetInfoStatus = (bool) => {// map pointer accident detail visible
    dispatch(setInfoStatus(bool));
  };

  /**const handleSetLoggedStatus = (bool) => {
    dispatch(setLoggedStatus(bool));
  };**/

  const setShowAllReport=(bool)=>{ //to make all user report render
    dispatch(setShowReport(bool))
  }
  const setCreateNewReport=(bool)=>{ // to make report form render
    dispatch(setCreateData(bool))
  }
  const handleGetAll=async()=>{
    try{
     const response = await axios.get('http://localhost:9000/login/reports',{
      headers: {
        'Authorization': `Bearer ${token}`
       }
    });
    const UserReport=response.data.data
     setUserReport(UserReport);
     handleSetInfoStatus(false);
     setShowAllReport(true);
     setCreateNewReport(false);
    // handleSetLoggedStatus(false);
     handleSetMapStatus(false);
    }
    catch(error){
    console.log(error.message);
    }
  }
  

  const handleCreateNew=()=>{
    handleSetInfoStatus(false);
    setShowAllReport(false);
    setCreateNewReport(true);
   // handleSetLoggedStatus(false);
    handleSetMapStatus(false);
  }

  
  return (
    <Box sx={{ width: '100%' }}>
      <Stack spacing={2}>
         <Item>
         <Button varient="contained" onClick={handleGetAll}>GET ALL REPORTS</Button>
         </Item>
        
        <Item>
        <Button onClick={handleCreateNew} varient="contained">
        CREATE NEW REPORT 
        </Button>
        </Item>

        
      </Stack>
    </Box>
  );
}

