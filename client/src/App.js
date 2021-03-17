// random comment

import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import PostGrid from './components/Posts/PostGrid/PostGrid.js';
import Form from './components/Form/Form.js';
import { getPosts } from "./redux/actions/posts.js";
// import useStyles from './styles';

const App = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
//   const classes = useStyles();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Container maxWidth="lg">
      <Container>
        <AppBar position="static" color="inherit">
          <Typography variant="h2" align="center">PDF Reader</Typography>
        </AppBar>
      </Container>
      <Grow in>
        <Container>
          <Grid container justify="center" alignItems="center" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
          <Grid container justify="center" alignItems="center" spacing={3}>
            <Grid item xs={12} sm={12}>
              <PostGrid currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
