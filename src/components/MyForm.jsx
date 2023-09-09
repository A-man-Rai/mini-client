import * as React from 'react';
import { Box , Button} from '@mui/material';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import {  useSelector , useDispatch} from 'react-redux';
import { setMapStatus, setInfoStatus, setLoggedStatus } from "../store/slices/HomeSlice";
import { setShowReport } from '../store/slices/GetAllReportSlice';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function MyForm() {
  const dispatch=useDispatch();
 // const showAllData=useSelector(state=>state.getAllReportData.showAllData);

  const handleSetMapStatus = (bool) => {
    dispatch(setMapStatus(bool));
  };
  
  const handleSetInfoStatus = (bool) => {
    dispatch(setInfoStatus(bool));
  };

  /**const handleSetLoggedStatus = (bool) => {
    dispatch(setLoggedStatus(bool));
  };**/

  const setShowAllReport=(bool)=>{
    dispatch(setShowReport(bool))
  }

  const handleGetAll=()=>{
     handleSetInfoStatus(false);
     setShowAllReport(true);
    // handleSetLoggedStatus(false);
     handleSetMapStatus(false);

  }

  
  return (
    <Box sx={{ width: '100%' }}>
      <Stack spacing={2}>
         <Item>
         <Button varient="contained" onClick={handleGetAll}>GET ALL REPORTED</Button>
         </Item>
        <Item>CREATE NEW REPORT </Item>
        <Item></Item>
      </Stack>
    </Box>
  );
}
