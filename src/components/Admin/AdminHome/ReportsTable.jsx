import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Save from './MapDataPage/Save.JSX';
import Edit from './MapDataPage/Edit';
import axios from 'axios';
import {setData} from "../../../store/slices/adminLoginSlice.js"
import _ from 'lodash';
export default function ReportsTable({showReportUpdateButton}) {
  const data=useSelector(state=>state.adminLogin.data)
  const token=useSelector(state=>state.adminLogin.token);
  const dispatch=useDispatch();

//console.log(data);
const handleDelete=async(id)=>{
  const response=await axios.delete(`http://localhost:9000/admin/reports/${id}`,{
    headers: {
      'Authorization': `Bearer ${token}`
     }
    
  })
  const res=await axios.get("http://localhost:9000/admin/reports",{
    headers: {
      'Authorization': `Bearer ${token}`
     }
  })
  
dispatch(setData(res.data))
  //console.log(response);
}

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="center">TITLE</TableCell>
            <TableCell align="center">DESCRIPTION</TableCell>
            <TableCell align="center">USER ID</TableCell>
            <TableCell align="center">LATITUDE</TableCell>
            <TableCell align="center">LONGITUDE</TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row._id}
              </TableCell>
              <TableCell align="center">{row.title}</TableCell>
              <TableCell align="center">{_.truncate(row.description,{
  'length': 30,
  'omission': '....',
})}</TableCell>
              <TableCell align="center">{row.userId}</TableCell>
              <TableCell align="center">{row.latitude}</TableCell>
              <TableCell align="center">{row.longitude}</TableCell>      
              <TableCell align="center">
              <Save reportId={row._id}></Save>
              </TableCell>
              <TableCell align="center">
             <Edit showReportUpdateButton={showReportUpdateButton} updateId={row._id}></Edit>
       
              </TableCell>

              <TableCell align="center">     
                <Button variant="contained" color="error" onClick={()=>{handleDelete(row._id)}}>DELETE</Button>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
