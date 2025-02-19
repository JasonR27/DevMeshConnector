import React from "react";
import { Container, Box, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

const PostActions: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Link to="/post/new" style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              startIcon={<AddIcon />}
            >
              Add Post
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PostActions;
