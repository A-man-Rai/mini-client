import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { useDispatch } from "react-redux";
// Update imported action creator names
import { setMapStatus, setInfoStatus } from "../../store/slices/HomeSlice";

function CustomCard({ link }) {
  const dispatch = useDispatch();

  // Use the updated action creator names
  const handleSetMapStatus = (bool) => {
    dispatch(setMapStatus(bool));
  };

  const handleSetInfoStatus = (bool) => {
    dispatch(setInfoStatus(bool));
  };

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
          One Piece is a Japanese manga series written and illustrated by Eiichiro Oda. It has been serialized in Shueisha's shōnen manga magazine Weekly Shōnen Jump since July 1997.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
        <Button size="small" onClick={() => {
          handleSetMapStatus(false);
          handleSetInfoStatus(true);
        }}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}

export default CustomCard;
