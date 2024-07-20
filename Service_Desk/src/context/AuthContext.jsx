import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, loginNew } from "../action/Login";
import { useDispatch, useSelector } from "react-redux";
var CryptoJS = require("crypto-js");
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    let userProfile = localStorage.getItem("user");
    if (userProfile) {
      return JSON.parse(userProfile);
    }
    return null;
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function Encryption(number) {
    var key = CryptoJS.enc.Utf8.parse(process.env.REACT_APP_API_KEY);
    var iv = CryptoJS.enc.Utf8.parse(process.env.REACT_APP_API_KEY);
    var encrypted = CryptoJS.AES.encrypt(
      CryptoJS.enc.Utf8.parse(number),
      key,
      {
        keySize: 64 / 4,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    );
    // console.log(encrypted.toString());
    return encrypted.toString();
  }
  

  const handleLogin = async (userName, password) => {
      var token = Encryption(userName + "`" + password);
    //  console.log(token);
    // var token = "3KgtJTtBF/J5KAZ8XcRQwGM4vTOXC9091r4XDPAPrOA=";
    
    await dispatch(loginNew(token, navigate));
  };
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
