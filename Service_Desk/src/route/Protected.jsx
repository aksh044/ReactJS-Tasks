import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Toolbar, Typography, AppBar } from "@mui/material";

const Protected = ({ path, component: Component }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  if (isLoggedIn) {
    return (
      <>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div">
              My App
            </Typography>
          </Toolbar>
        </AppBar>
        <Route path={path} element={<Component />} />
      </>
    );
  } else {
    return <Navigate to="/login" />;
  }
};

export default Protected;
