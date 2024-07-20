import axios from "axios";

const GetMyTickets = (data) => {
  return axios({
    url: "Ticket/GetMyTickets",
    method: "POST",
    data: data,
  }).then((response) => {
    // console.log(response.data);
    return response;
  });
};

const TicketInteract = (data) => {
  console.log(data);
  return axios({
    url: "Ticket/TicketInteract",
    method: "POST",
    data: data,
  }).then((response) => {
    // console.log(response.data);
    return response;
  });
};

const CompleteInteract = (data) => {
  console.log(data);
  return axios({
    url: "Ticket/CompleteInteract",
    method: "POST",
    data: data,
  }).then((response) => {
    // console.log(response.data);
    return response;
  });
};

export default {
  GetMyTickets,
  TicketInteract,
  CompleteInteract,
};
