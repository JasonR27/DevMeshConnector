import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Grid, Box } from '@mui/material';

const ProfilesActions: React.FC = () => {
  return (
    <Container
      maxWidth="xl"
      sx={{
        py: 5,
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <Button
            component={Link}
            to="/profiles/new"
            variant="contained"
            size="small"
            startIcon={<i className="bi bi-plus" />}
          >
            Add a Profile
          </Button>
        </Grid>
        <Grid item>
          <Button
            component={Link}
            to="/profiles/myprofiles"
            variant="contained"
            size="small"
          >
            See my profiles
          </Button>
        </Grid>
        <Grid item>
          <Button
            component={Link}
            to="/profiles/mainprofile"
            variant="contained"
            size="small"
          >
            Main Profile
          </Button>
        </Grid>
        <Grid item>
          <Button
            component={Link}
            to="/profiles/currentprofile"
            variant="contained"
            size="small"
          >
            Current Profile
          </Button>
        </Grid>
        <Grid item>
          <Button
            component={Link}
            to="/users"
            variant="contained"
            size="small"
          >
            Connections
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfilesActions;
