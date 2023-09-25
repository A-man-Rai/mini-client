import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';

import Add from './MapDataPage/Add';
import axios from 'axios';
import Edit from './MapDataPage/Edit';
export default function Tables() {
  const data=useSelector(state=>state.adminLogin.data)
//console.log(data);
const token=useSelector(state=>state.adminLogin.token);

const handleDelete=async(id)=>{
  const response=await axios.delete(`http://localhost:9000/admin/maps/${id}`,{
    headers: {
      'Authorization': `Bearer ${token}`
     }
   
  })
  console.log(response);
}
  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="center">TITLE</TableCell>
            <TableCell align="center">DESCRIPTION</TableCell>
            <TableCell align="center">Latitude</TableCell>
            <TableCell align="center">Longitude</TableCell>
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
              <TableCell align="center">{row.description}</TableCell>  
              <TableCell align="center">{row.latitude}</TableCell>
              <TableCell align="center">{row.longitude}</TableCell>
              <TableCell align="center">
                <Edit updateId={row._id}></Edit>
              </TableCell>
              <TableCell align="center">
              <Button variant="contained" color="error" onClick={()=>{
              handleDelete(row._id)
              }}>DELETE</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
   
    </TableContainer>
    <Add></Add>
</>
  );
}
