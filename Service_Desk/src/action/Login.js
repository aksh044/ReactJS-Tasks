import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
} from "../constants/userConstants";

import AuthService from "../service/AuthService";
import { toast } from "react-toastify";

export const loginNew = (token, navigate) => async (dispatch) => {
  dispatch({
    type: LOGIN_REQUEST,
  });
  console.log(token);
  return await AuthService.login(token).then(
    (data) => {
      if (data.data.sessionGuid) {
        console.log(data.data.sessionGuid);
        dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            user: data.data.userID,
            userName: data.data.username,
            sessionGuid: data.data.sessionGuid,
            userType: data.data.userType,
          },
        });

        localStorage.setItem("user", JSON.stringify(data.data.userID));
        localStorage.setItem("userType", JSON.stringify(data.data.userType));
        localStorage.setItem(
          "sessionGuid",
          JSON.stringify(data.data.sessionGuid)
        );
        navigate(`/`);
      } else {
        dispatch({
          type: LOGIN_FAIL,
          payload: {},
        });

        toast.error("Not Registed User!");
      }
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: LOGIN_FAIL,
        payload: { error: message },
      });
      toast.error("Not Registed User!");
      //  return Promise.reject();
    }
  );
};

export const logOut = async (navigate) => {
  await localStorage.removeItem("user");
  await localStorage.removeItem("sessionGuid");
  await localStorage.removeItem("userType");
  navigate(`/login`);
  return Promise.resolve();
};

export const loadUser = (data, navigate) => async (dispatch) => {
  dispatch({
    type: LOGIN_SUCCESS,
    payload: {
      user: JSON.parse(localStorage.getItem("user")),
      userType: JSON.parse(localStorage.getItem("userType")),
      sessionGuid: JSON.parse(localStorage.getItem("sessionGuid")),
    },
  });
  navigate(`/`);
};
