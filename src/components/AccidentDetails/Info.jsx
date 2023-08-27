
import { Card, CardContent, CardHeader, Typography } from '@mui/material';

export default function Info() {
  return (
    <Card>
      <CardHeader
        title="One Piece"
       // subheader={`Published on ${props.date}`}
      />
      <CardContent>
        <Typography variant="body1">
        One Piece (stylized in all caps) is a Japanese manga series written and
     illustrated by Eiichiro Oda. It has been serialized in Shueisha's
      shōnen manga magazine Weekly Shōnen Jump since July 1997,
     with its individual chapters compiled into 106 tankōbon volumes as
      of July 2023. The story follows the adventures of Monkey D. Luffy and
       his crew, the Straw Hat Pirates, where he explores the Grand
      Line in search of the mythical treasure known as the "One Piece" in
       order to become the next King of the Pirates.
        </Typography>
      </CardContent>
    </Card>
  );
}

