import React from 'react';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

export default function Info() {
  const data = useSelector(state => state.home.getDataById);
  const info = data?.description; // Use optional chaining to handle potential undefined

  // Check if info is defined before splitting
  const lines = info ? info.split('\n') : [];

  return (
    <Card>
      <CardHeader title={data.title}/>
      <CardContent>
        {lines.map((line, index) => (
          <Typography key={index} variant="body1">
            {line.trim()} {/* Trim to remove leading/trailing whitespaces */}
          </Typography>
        ))}
      </CardContent>
    </Card>
  );
}
