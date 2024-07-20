import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Signin from "./layouts/authentication/sign-in";
import EngineerHome from "./layouts/other/EngineerHome";
import ManagerHome from "./layouts/other/ManagerHome";
import ProtectedRoute from "./route/ProtectedRoute";
import { AuthContextProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StyledEngineProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";
import store from "./store";
import { loadUser } from "./action/Login";

function App() {
  const { userType } = useSelector((state) => state.auth);
  let navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("sessionGuid"));
    if (data) store.dispatch(loadUser(data, navigate));
  }, []);

  return (
    <AuthContextProvider>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <StyledEngineProvider injectFirst>
        <Routes>
          <Route element={<ProtectedRoute />}>
            {userType === "User" ? (
              <Route element={<EngineerHome />} path="/" exact />
            ) : (
              <Route element={<ManagerHome />} path="/" exact />
            )}
          </Route>
          <Route element={<Signin />} path="/" exact />
          <Route element={<Signin />} path="/login" exact />
          <Route element={<Signin />} path="/*" exact />
        </Routes>
      </StyledEngineProvider>
    </AuthContextProvider>
  );
}

export default App;
