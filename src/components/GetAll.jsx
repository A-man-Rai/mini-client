
import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
export default function GetAll(){

return(
<Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          STRAW HATS
        </Typography>
        <Typography variant="body2" color="text.secondary">
              HERE
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">DELETE</Button>
       
      </CardActions>
    </Card>
);


}