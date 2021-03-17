import React from 'react';
import { Card, CardActions, CardContent, Button, Typography, Grid } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import GetAppIcon from '@material-ui/icons/GetApp';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

import { useDispatch } from 'react-redux';

import { deletePost } from "../../../redux/actions/posts.js";

import * as api from '../../../api/index.js';

import ViewingWindow from '../../ViewingWindow/ViewingWindow.js';

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
  root: {
    minWidth: 1000,
    maxWidth: 1000,
  }
});




const PostItem = ({ post, setCurrentId, currentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();


  const handleDownloadFromCloudStorage = async () => {
    // Download from Google Cloud Storage
    // const url = getDownloadSignedUrl(post.visionApiOutputCloudStorageName);
    const url = await api.getDownloadSignedURL( {filename: post.visionApiOutputCloudStorageName } );
    const downloadURL = url.data;

    // Creates, clicks on, & then removes an anchor download tag
    // equivalent to: <a href={downloadURL} download={post.visionApiOutputCloudStorageName}></a>
    const link = document.createElement('a'); 
    link.href = downloadURL; 
    link.setAttribute('download', "download"); 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadFromState = () => {
    // create download from state
    const jsonFile = {text: post.visionApiOutputText};
    const url = window.URL.createObjectURL(new Blob([JSON.stringify(jsonFile)]));

    // Creates, clicks on, & then removes an anchor download tag
    // equivalent to: <a href={url} download={post.visionApiOutputCloudStorageName}></a>
    const link = document.createElement('a'); 
    link.href = url;
    link.setAttribute('download', post.visionApiOutputCloudStorageName); 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDeletion = () => {
    const deletionData = {
      id: post._id,
      fileCloudStorageName: post.fileCloudStorageName,
      visionApiOutputCloudStorageName: post.visionApiOutputCloudStorageName
    };

    dispatch(deletePost(deletionData));

    setCurrentId(1);
  };

  return (
  <Card className={classes.root}>
    <CardContent>
      <Typography variant="h6">Title: <i>{post.title}</i></Typography>
      <Typography variant="body1" component="h2">Creator: <i>{post.creator}</i></Typography>
      <CardActions >
        <Button size="small" color="primary" onClick={() => setCurrentId(post.idString)}><VisibilityIcon fontSize="default" /> View </Button>
        <Button size="small" color="primary" onClick={handleDownloadFromCloudStorage}><CloudDownloadIcon fontSize="small" />  Download From Cloud Storage</Button>
        <Button size="small" color="primary" onClick={handleDownloadFromState}><GetAppIcon fontSize="small" /> Download From State</Button>
        <Button size="small" color="primary" onClick={handleDeletion}><DeleteIcon fontSize="small" /> Delete</Button>
      </CardActions>
    </CardContent>

    {post._id==currentId && 
      <Grid container>
        <Button size="small" color="primary" onClick={() => setCurrentId(0)}><ExpandLessIcon fontSize="default" /> Collapse </Button>
        <ViewingWindow post={post}></ViewingWindow>
      </Grid>
    }

  </Card>
);
};


export default PostItem;