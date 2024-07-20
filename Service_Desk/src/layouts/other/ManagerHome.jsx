import React, { useEffect } from "react";
import ResponsiveAppBar from "../../components/AppBar/ResponsiveAppBar";

import { Grid, Skeleton, Stack } from "@mui/material";
import EngineeringCard from "../../components/Cards/EngineeringCard";
import { GetMyTickets } from "../../action/Ticket";
import { GetAllUsers } from "../../action/Common";
import { useDispatch, useSelector } from "react-redux";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { useNavigate } from "react-router-dom";

function ManagerHome() {
  const { ticketData, loading } = useSelector((state) => state.ticket);
  const { userData } = useSelector((state) => state.allUser);
  const [user, setUser] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [filteredData, setFilteredData] = React.useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (userData.length === 0) {
      dispatch(GetAllUsers(navigate));
    }
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (
      metaThemeColor &&
      window.CSS &&
      CSS.supports("color", "var(--fake-var)")
    ) {
      const gradient =
        "linear-gradient(to right, var(--start-color), var(--end-color))";
      document.body.classList.add("gradient-theme");
      metaThemeColor.setAttribute("content", gradient);
    } else {
      metaThemeColor.setAttribute("content", "#fff");
    }

    if (status === "" || status === "All") {
      setFilteredData(ticketData);
    } else {
      const filtered = ticketData.filter(
        (item) => item.currentStatus === status
      );
      setFilteredData(filtered);
    }
  }, [status, ticketData, dispatch, navigate, userData.length]);

  const handleUserChange = (event) => {
    setUser(event.target.value);
    if (status !== "") {
      dispatch(GetMyTickets(event.target.value, navigate));
    }
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    if (user !== "") {
      dispatch(GetMyTickets(event.target.value, navigate));
    }
  };

  return (
    // <div  style={{backgroundColor:'red'}}>
    <Grid
      container
      spacing={2}
      sx={{
        alignItems: "center",
        justifyContent: "center",
        //bgcolor: "#F8F9FA",
      }}
    >
      <Grid item xs={12}>
        <ResponsiveAppBar></ResponsiveAppBar>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          flexDirection: "row",
          // padding:2,
          alignItems: "center",
          justifyContent: "center",
          marginLeft: 2,
          marginRight: 2,
        }}
      >
        <FormControl sx={{ m: 1, minWidth: "50%" }}>
          <InputLabel id="demo-simple-select-label">User</InputLabel>
          <Select value={user} label="User" onChange={handleUserChange}>
            {userData.map((item, index) => (
              <MenuItem value={item.userId}>{item.username}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: "50%" }}>
          <InputLabel id="Status">Status</InputLabel>
          <Select
            labelId="Status"
            id="Status"
            value={status}
            label="Status"
            onChange={handleStatusChange}
          >
            <MenuItem value={"All"}>All</MenuItem>
            <MenuItem value={"Complete"}>Complete</MenuItem>
            <MenuItem value={"Paused"}>Paused</MenuItem>
            <MenuItem value={"Resumed"}>Resumed</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Grid>
          {loading ? (
            <Stack spacing={1}>
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              <Skeleton variant="rectangular" width={"100%"} height={60} />
              <Skeleton variant="rounded" width={"100%"} height={60} />
            </Stack>
          ) : (
            <Grid item lg={12} md={12} sm={12} xs={12}>
              {filteredData.map((item, index) => (
                <EngineeringCard
                  key={index}
                  ticketData={item}
                  onlyvisibity={true}
                ></EngineeringCard>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
    // </div>
  );
}

export default ManagerHome;
