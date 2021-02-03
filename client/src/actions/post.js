import axios from "axios";
import { setAlert } from "./alert";

import {
  DELETE_POST,
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  ADD_POST,
} from "./types";

//GET POSTS
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:5000/api/posts");
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response, status: err.response },
    });
  }
};

//ADD LIKE

export const addLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`http://localhost:5000/api/posts/like/${id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response, status: err.response },
    });
  }
};

//REMOVE LIKE

export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`http://localhost:5000/api/posts/unlike/${id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response, status: err.response },
    });
  }
};

//delete post
export const deletePost = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:5000/api/posts/${id}`);
    dispatch({
      type: DELETE_POST,
      payload: { id },
    });
    dispatch(setAlert("Post removed", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response, status: err.response },
    });
  }
};

//ADD POSTS
export const addPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      `http://localhost:5000/api/posts`,
      formData,
      config
    );
    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
    dispatch(setAlert("Post was published", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response, status: err.response },
    });
  }
};
