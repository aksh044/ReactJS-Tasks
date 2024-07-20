import {
  GETALLUSER_FAIL,
  GETALLUSER_REQUEST,
  GETALLUSER_SUCCESS,
} from "../constants/common";

const initialState = {
  userData: [],
  error: null,
  loading: false,
};

export const GetAllUsers = (state = initialState, action) => {
  switch (action.type) {
    case GETALLUSER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GETALLUSER_SUCCESS:
      return {
        ...state,
        userData: action.payload.userData,
        error: null,
        loading: false,
      };
    case GETALLUSER_FAIL:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
