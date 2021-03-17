import axios from 'axios';

const url = 'http://localhost:5000/posts';  // this is the server endpoint


export const createPostMongoDB = (newPost) => axios.post(url, newPost);
export const uploadToCloudStorage = (newFile) => axios.post(`${url}/storage`, newFile);

export const getUploadSignedURL = (file) => axios.post(`${url}/uploadSignedURL`, file);
export const getDownloadSignedURL = (file) => axios.post(`${url}/downloadSignedURL`, file);

export const fetchPosts = () => axios.get(url);

export const deletePostFromMongo = (id) => axios.delete(`${url}/${id}`);
//posting deletionDate to GCloud(uses that data to decide what to delete)
export const deletePostFromCloudStorage = (deletionData) => axios.post(`${url}/storage`, deletionData); 
