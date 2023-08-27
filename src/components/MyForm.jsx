import React, { useState } from 'react';
import { Button, TextField, Grid, Container, Typography } from '@mui/material';

function MyForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Title:', title);
    console.log('Description:', description);

    // Here, you'd typically send the data to the server or handle it according to your requirements

    setTitle(''); // Reset title
    setDescription(''); // Reset description
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        My Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Send
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default MyForm;
