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

import TicketService from "../service/TicketService";
import { toast } from "react-toastify";
import { logOut } from "./Login";

export const GetMyTickets = (id, navigate) => async (dispatch) => {
  const userType = JSON.parse(localStorage.getItem("userType"));
  const sessionId = JSON.parse(localStorage.getItem("sessionGuid"));
  let userIDFilter = "";
  if (userType === "Manager") {
    userIDFilter = id;
  } else {
    userIDFilter = JSON.parse(localStorage.getItem("user"));
  }
  let requestdata = JSON.stringify({
    // userIDFilter: "4860",
    // userIDFilter: "4859",
    //  userIDFilter: "4878",
    userIDFilter: userIDFilter,
    sessionGuid: sessionId,
    // sessionGuid: '9c40859f-dd13-457d-b4bc-097922c713c4',
  });
  dispatch({
    type: TICKET_REQUEST,
  });
  return await TicketService.GetMyTickets(requestdata).then(
    (data) => {
      if (data.data.statusCode === 200) {
        dispatch({
          type: TICKET_SUCCESS,
          payload: {
            ticketData: data.data.result,
          },
        });
      } else {
        dispatch({
          type: TICKET_FAIL,
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
        type: TICKET_FAIL,
        payload: { error: message },
      });

      if (error.response.data.status === 401) {
        toast.info("Current session expired. Please sign in again.");
        logOut(navigate);
      }
    }
  );
};

export const TicketInteract = (ticketId, navigate) => async (dispatch) => {
  let requestdata = JSON.stringify({
    ticketId: ticketId,
    dateTime: getCurrentDateTime(),
  });
  dispatch({
    type: TICKET_INTERACT_REQUEST,
  });
  return await TicketService.TicketInteract(requestdata).then(
    (data) => {
      if (data.data.statusCode === 200) {
        dispatch({
          type: TICKET_INTERACT_SUCCESS,
          payload: {},
        });
      } else {
        dispatch({
          type: TICKET_INTERACT_FAIL,
          payload: {},
        });

        toast.error("Ticket Not Updated!");
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
        type: TICKET_INTERACT_FAIL,
        payload: { error: message },
      });
      if (error.response.data.status === 401) {
        toast.info("Current session expired. Please sign in again.");
        logOut(navigate);
      }
      //  return Promise.reject();
    }
  );
};

export const CompleteInteract = (ticketId, navigate) => async (dispatch) => {
  let requestdata = JSON.stringify({
    ticketId: ticketId,
    dateTime: getCurrentDateTime(),
  });

  dispatch({
    type: TICKET_COMPLETE_INTERACT_REQUEST,
  });
  return await TicketService.CompleteInteract(requestdata).then(
    (data) => {
      if (data.data.statusCode === 200) {
        dispatch({
          type: TICKET_COMPLETE_INTERACT_SUCCESS,
          payload: {},
        });
        toast.success("Ticket completed");
      } else {
        dispatch({
          type: TICKET_COMPLETE_INTERACT_FAIL,
          payload: {},
        });

        toast.error("Ticket Not Completed!");
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
        type: TICKET_COMPLETE_INTERACT_FAIL,
        payload: { error: message },
      });
      if (error.response.data.status === 401) {
        toast.info("Current session expired. Please sign in again.");
        logOut(navigate);
      }
      //return Promise.reject();
    }
  );
};

function getCurrentDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return formattedDateTime;
}
