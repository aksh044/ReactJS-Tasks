import axios from "axios";

const GetAllUsers = (data) => {
  return axios({
    url: "User/GetAllUsers",
    method: "GET",
    data: data,
  }).then((response) => {
    return response;
  });
};

export default {
  GetAllUsers,
};
