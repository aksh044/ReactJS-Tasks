import {
  TICKET_FAIL,
  TICKET_REQUEST,
  TICKET_SUCCESS,
  TICKET_INTERACT_FAIL,
  TICKET_INTERACT_REQUEST,
  TICKET_INTERACT_SUCCESS,
  TICKET_COMPLETE_INTERACT_FAIL,
  TICKET_COMPLETE_INTERACT_REQUEST,
  TICKET_COMPLETE_INTERACT_SUCCESS,
} from "../constants/ticketConstant";

const initialState = {
  ticketData: [],
  error: null,
  loading: false,
};

export const tikectReducer = (state = initialState, action) => {
  switch (action.type) {
    case TICKET_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TICKET_SUCCESS:
      return {
        ...state,
        ticketData: action.payload.ticketData,
        error: null,
        loading: false,
      };
    case TICKET_FAIL:
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };
    case TICKET_INTERACT_REQUEST:
      return {
        ...state,
      };
    case TICKET_INTERACT_SUCCESS:
      return {
        ...state,
      };
    case TICKET_INTERACT_FAIL:
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };
    case TICKET_COMPLETE_INTERACT_REQUEST:
      return {
        ...state,
      };
    case TICKET_COMPLETE_INTERACT_SUCCESS:
      return {
        ...state,
      };
    case TICKET_COMPLETE_INTERACT_FAIL:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
