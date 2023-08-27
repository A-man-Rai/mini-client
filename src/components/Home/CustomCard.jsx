import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { Button } from '@mui/material';


 function CustomCard({link,setMap,setInfo}) {
 
 return (
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          alt="straw hats"
          height="140"
          image={link}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            STRAW HATS
          </Typography>
          <Typography variant="body2" color="text.secondary">
          One Piece is a Japanese manga series written and illustrated by Eiichiro Oda.
           It has been serialized in Shueisha's shōnen manga magazine Weekly Shōnen Jump since July 1997. 
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" >Learn More</Button>
          <Button size="small" onClick={()=>{
            setMap(false);
            setInfo(true);
          }}>Learn More</Button>
        </CardActions>
      </Card>
    );
 }
  


export default CustomCard;
