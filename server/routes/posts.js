import express from 'express';

import { createPost, getAllPosts, deletePostFromMongo } from '../controllers/posts.js'; 
import { generateV4UploadSignedUrl, generateV4ReadSignedUrl, deleteFileFromCloudStorage } from '../controllers/googleStorageFunctions.js';

const router = express.Router();

router.post('/', createPost);
router.post('/uploadSignedURL', generateV4UploadSignedUrl);
router.post('/downloadSignedURL', generateV4ReadSignedUrl);
router.get('/', getAllPosts);
router.delete('/:id', deletePostFromMongo);
// post deletionData to GCloud(Cloud function uses data to decide what to delete)
router.post('/storage', deleteFileFromCloudStorage) 


export default router;