import express from 'express';
import mongoose from 'mongoose';

import PostSchemaMongo from '../models/postSchemaMongo.js';

const router = express.Router();

export const getAllPosts = async (req, res) => { 
    try {
        const postMessages = await PostSchemaMongo.find();

        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {

    const {_id, idString, title, creator, filename} = req.body;

    const newPostMessage = new PostSchemaMongo({
        _id, 
        idString, 
        title, 
        creator, 
        filename, 
        visionApiOutputText: "",
        fileCloudStorageName: `${idString}--${filename}`,
        visionApiOutputCloudStorageName: ""
    });

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const deletePostFromMongo = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostSchemaMongo.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}


export default router;