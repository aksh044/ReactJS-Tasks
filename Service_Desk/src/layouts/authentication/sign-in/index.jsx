import { useState, useContext } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Grid,
} from "@mui/material";
import bgImage from "../../../assets/images/bgimg.jpg";
import "react-phone-input-2/lib/style.css";
import logo from "../../../assets/images/logo.png";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "../../../context/AuthContext";
import { toast } from "react-toastify";
function SignIn(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin } = useContext(AuthContext);
  const { loading } = useSelector((state) => state.auth);

  const validate = () => {
    let isValid = true;
    if (username === "" || password === "") {
      isValid = false;
      toast.error("Please Enter Valid User Name and Password.");
    }
    return isValid;
  };

  const Login = async () => {
    if (validate()) {
      await handleLogin(username, password);
    }
  };

  const styles = {
    container: {
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundImage: "url('../assets/bgimg.jpg')",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center center",
    },
    formContainer: {
      marginTop: "2rem",
      textAlign: "center",
    },
    heading: {
      color: "#FF735C",
      fontWeight: "bold",
      textAlign: "center",
    },
  };

  return (
    <Box
      position="absolute"
      width="100%"
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        overflowX: "hidden",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box px={1} width="100%" height="100vh" mx="auto">
        <Grid
          container
          spacing={1}
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            <img src={logo} alt="Centered Image" style={{ width: "100%" }} />
            <Typography variant="h4" color="primary" sx={styles.heading}>
              Sign In
            </Typography>
            <TextField
              type="text"
              sx={{
                input: { textAlign: "center" },
              }}
              id="username"
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              margin="normal"
              InputProps={{ sx: { borderRadius: 8, backgroundColor: "#fff" } }}
            />
            <TextField
              type="password"
              sx={{ input: { textAlign: "center" } }}
              id="password"
              label="Password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{ sx: { borderRadius: 8, backgroundColor: "#fff" } }}
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              //color="inherit"
              size="large"
              disabled={loading}
              onClick={Login}
              sx={{
                borderRadius: "40px",
                marginTop: "1rem",
                backgroundColor: "#FF735C",
              }}
              fullWidth
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: "#FFFFFF",
                  }}
                >
                  Go
                </Typography>
              )}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default SignIn;
