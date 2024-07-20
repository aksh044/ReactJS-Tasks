import { API_REQUEST, API_RESPONSE } from "../constants/apiConstants";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

export const apiReducer = (state = initialState, action) => {
  switch (action.type) {
    case API_REQUEST:
      return {
        ...state,
        data: action.payload.user,
        loading: true,
        error: null,
      };
    case API_RESPONSE:
      return {
        ...state,
        error: action.payload.error,
        data: null,
        loading: false,
      };
    default:
      return state;
  }
};
