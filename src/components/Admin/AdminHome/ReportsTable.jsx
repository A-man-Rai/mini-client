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
export default function ReportsTable() {
  const data=useSelector(state=>state.adminLogin.data)
console.log(data);
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
              <TableCell align="center">{row.description}</TableCell>
              <TableCell align="center">{row.userId}</TableCell>
              <TableCell align="center">{row.latitude}</TableCell>
              <TableCell align="center">{row.longitude}</TableCell>      
              <TableCell align="center">
              <Button variant="contained" color='success'>SAVE</Button>
       
              </TableCell>
              <TableCell align="center">
              <Button variant="contained" >EDIT</Button>
       
              </TableCell>

              <TableCell align="center">     
                <Button variant="contained" color="error">DELETE</Button>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
