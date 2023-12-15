import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { useDispatch,useSelector } from "react-redux";
import axios from 'axios';
import _ from 'lodash';
// Update imported action creator names
import { setMapStatus, setInfoStatus ,setData} from "../../store/slices/HomeSlice";

function CustomCard({title,description,id }) {
  const dispatch = useDispatch();
  const isLogin=useSelector(state=>state.login.isLogin);
  // Use the updated action creator names
  const handleSetMapStatus = (bool) => {
    dispatch(setMapStatus(bool));
  };

  const handleSetInfoStatus = (bool) => {
    dispatch(setInfoStatus(bool));
  };
  
   const setOneData=(data)=>{
    dispatch(setData(data));
  }

  const fetchbyId = async (id) => {
    const response=await axios.get(`http://localhost:9000/${id}`) 
    setOneData(response.data.data);
   // console.log(response.data.data);
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
         {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         {_.truncate(description,{
  'length': 30,
  'omission': '....',
  })}
        </Typography>
      </CardContent>
      <CardActions>
       {isLogin && <Button size="small" onClick={() => {
          handleSetMapStatus(false);
          handleSetInfoStatus(true);
          fetchbyId(id)
        }}>
          Read More
        </Button>}
      </CardActions>
    </Card>
  );
}

export default CustomCard;
