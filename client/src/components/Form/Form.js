import React, { useState } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { ObjectId } from 'bson';

import useStyles from './styles';

import { createPost } from '../../redux/actions/posts.js';

import * as api from '../../api/index.js';
import axios from 'axios';



const Form = ({ currentId, setCurrentId }) => {

  const [selectedFile, setSelectedFile] = useState('');
  const [_id, set_id] = useState('');
  const [idString, setIdString] = useState('');

  const [title, setTitle] = useState('');
  const [creator, setCreator] = useState('');
  const [fileName, setFileName] = useState('');

  const dispatch = useDispatch();
  const classes = useStyles();


  const clear = () => {
    setCurrentId(0);
    setCreator('');
    setTitle('');
    setFileName('');
    setSelectedFile('');
    document.getElementById("inputFile").value = "";
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(createPost({
        _id: _id, 
        idString: idString, 
        title: title, 
        creator: creator, 
        filename: fileName}));

      // Uploads file to cloud storage
      const url = await api.getUploadSignedURL( {fileName: fileName, ID: idString } );
      const uploadURL = url.data;
      await axios.put(uploadURL, selectedFile, {
        headers: {
          'Access-Control-Allow-Origin': "*",
          'Content-Type': 'application/octet-stream'}
      });

      clear();

    } catch (error) {
      console.log(error);
    }
  };

  const fileSelectedHandler = async (e) => {
    try {

      setFileName(e.target.files[0].name);
      setSelectedFile(e.target.files[0]);

      const newID = new ObjectId();
      set_id(newID);

      // removes quotation mark characters from a string 
      // quotations as characters within a string are confusing/unnecessary
      const regex = /(")(.*)(")/gi;
      const newIdAsString = JSON.stringify(newID).replace(regex, "$2");
      setIdString(newIdAsString);

    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div>
      <Paper className={classes.paper}>
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Typography variant="h6">Convert your entire PDF to JSON</Typography>
          <TextField name="creator" variant="outlined" label="Creator" fullWidth value={creator} onChange={(e) => setCreator(e.target.value)} />
          <TextField name="title" variant="outlined" label="Give your PDF a Title" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} />
          <div>
            <input type="file" id="inputFile" onChange={fileSelectedHandler} />
          </div>
          <Button variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
          <Button color="secondary" size="small" alignItems="center" onClick={clear} fullWidth>Clear</Button>
        </form>
      </Paper>
    </div>
  );
};

export default Form;