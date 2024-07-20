import axios from "axios";

const login = (token) => {
  let data = JSON.stringify({
    userToken: token,
  });
  return axios({
    url: "User/LogIn",
    method: "POST",
    data: data,
  }).then((response) => {
    console.log(response.data);
    return response;
  });
};

export default {
  login,
};
