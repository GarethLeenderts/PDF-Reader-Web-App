import React from 'react';
import { Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';

import PostItem from '../PostItem/PostItem.js';
// import useStyles from './styles';


const PostGrid = ({ currentId, setCurrentId }) => {
  const posts = useSelector((state) => state.posts);
//   const classes = useStyles();

  return (
    <Grid container direction="column" justify="center" alignItems="center" spacing={3}>
      {posts.map((post) => (
        <Grid item xs={12} sm={12} md={12}>
          <PostItem post={post} setCurrentId={setCurrentId} currentId={currentId}/>
        </Grid>
      ))}
    </Grid>
  );
};


export default PostGrid;