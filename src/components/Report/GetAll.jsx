
import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { Button,Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { useSelector ,useDispatch} from 'react-redux';
import axios from "axios"
import { setDeleteElement } from '../../store/slices/UserReportsSlice';
import { setShowReport,setCreateData } from '../../store/slices/GetAllReportSlice';
import { setUpdateId} from '../../store/slices/showUpdateButton';
import Edit from './Edit';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function GetAll(){
  const token = useSelector(state => state.responseData.token);

const dispatch=useDispatch();

const deleteById=(id)=>{ // to delete one element from array which contains all
  // userReport  send from server and change state to re render
  dispatch(setDeleteElement(id))
}

const userReports = useSelector(state => state.userReports);



const handleEdit=(id)=>{
  dispatch(setUpdateId(id));//set id of object which needs to be updated
}


 const handleDelete=async(id)=>{
  try{
    const response=await axios.delete(`http://localhost:9000/login/report/${id}`,{
      headers: {
        'Authorization': `Bearer ${token}`
       }
    })
    deleteById(id); // 
     console.log(response);
  }
  catch(error){
 console.log(error);
  }
}

console.log(userReports);

return(
<Box sx={{ width: '100%' }}>
<Stack spacing={2}>
   
     {userReports.map(data=>(
      <Item key={data._id}>
   <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
              {data.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
             { data.latitude}
        </Typography>
        <Typography variant="body2" color="text.secondary">
              {data.longitude}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={()=>{
         handleDelete(data._id)
        }} size="small">DELETE</Button>
        
      
          <Edit onClick={()=>{handleEdit(data._id)}}/>
         

      </CardActions>
    </Card>
   </Item>
     ))}
    
  
</Stack>
</Box>


)
}