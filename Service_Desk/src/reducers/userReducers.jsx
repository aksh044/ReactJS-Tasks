import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SET_MESSAGE,
  LOGIN_REQUEST,
} from "../constants/userConstants";

const initialState = {
  isLoggedIn: false,
  user: null,
  error: null,
  userName: null,
  sessionGuid: null,
  loading: false,
  userType: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user,
        userName: action.payload.userName,
        sessionGuid: action.payload.sessionGuid,
        userType: action.payload.userType,
        error: null,
        loading: false,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        error: action.payload.error,
        isLoggedIn: false,
        loading: false,
      };
    default:
      return state;
  }
};
