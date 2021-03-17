import { CREATE, FETCH_ALL, DELETE } from '../constants/actionTypes';
import * as api from '../../api/index.js';

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    // Adds post to MongoDB
    const { data } = await api.createPostMongoDB(post);

    // Adds post to state
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};


export const deletePost = (deletionData) => async (dispatch) => {
  try {
    const id = deletionData.id;
    await api.deletePostFromMongo(id);

    await api.deletePostFromCloudStorage(deletionData);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};
