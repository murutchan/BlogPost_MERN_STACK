import axios from "axios";
import { setAlert } from "./alert";

import { REGISTER_FAIL, REGISTER_SUCCESS } from "./types";

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
