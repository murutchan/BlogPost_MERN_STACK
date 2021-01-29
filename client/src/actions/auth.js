import axios from "axios";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";

import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOG_OUT,
} from "./types";

//LOAD USER

export const loadUser = () => async (dispatch) => {
  console.log(localStorage.token);
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("http://localhost:5000/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//REGISTER USER

export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post(
      "http://localhost:5000/api/users",
      body,
      config
    );

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

//LOGIN USER

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth",
      body,
      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

//LOG OUT USER

export const logout = () => (dispatch) => {
  dispatch({ type: LOG_OUT });
};
