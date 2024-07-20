import axios from "axios";

const instance = axios.create({
  baseURL: "https://esystems.cdl.lk/backend/BizTrack/",
  //   headers: {
  //     'Access-Control-Allow-Origin': 'http://127.0.0.1:3000',
  //     'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  //     'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
  //   },
});

export default instance;
