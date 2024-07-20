import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LinearProgress from "@mui/material/LinearProgress";
import { Box, CardActionArea, Grid, Paper, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { TicketInteract, CompleteInteract } from "../../action/Ticket";
import { useNavigate } from "react-router-dom";
// import logo from "../../assets/images/successfully-done.gif";
import logo from "../../assets/images/Tick.gif";
const CardWrapper = styled(Card)(({ theme }) => ({
  backgroundColor: "#fff",
  // color: "#fff",
  overflow: "hidden",
  position: "relative",
  marginRight: 10,
  marginLeft: 10,
  //width:'100%',
  "&:after": {
    content: '""',
    position: "absolute",
    width: 150,
    height: 150,
    // background: "#63C6A3",
    //background: "#3A46BA",
    // background: "#00BC8E",
    background: "#FF735C",
    borderRadius: "50%",
    top: -95,
    right: -90,
    // [theme.breakpoints.down("sm")]: {
    //   top: -105,
    //   right: -140,
    // },
  },
  "&:before": {
    content: '""',
    position: "absolute",
    width: 200,
    height: 180,
    background: "#FF735C",
    borderRadius: "50%",
    top: -140,
    right: -15,
    opacity: 0.5,
    // [theme.breakpoints.down("sm")]: {
    //   top: -155,
    //   right: -70,
    // },
  },
}));

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard({ key, ticketData, onlyvisibity }) {
  const [expanded, setExpanded] = useState(false);
  const [viewOnly, setIsViewOnly] = useState(
    ticketData.currentStatus === "Completed" ? true : false
  );
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [currentStatus, setCurrentStatus] = useState(ticketData.currentStatus);
  const [totalWorkSeconds, setTotalWorkSeconds] = useState(
    Number(ticketData.workHrs)
  );
  const [totalFreeSeconds, setTotalFreeSeconds] = useState(
    Number(ticketData.freeHrs)
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    let interval;
    if (currentStatus === "Paused") {
      console.log("paused");
      interval = setInterval(() => {
        setTotalFreeSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else if (currentStatus === "Resumed") {
      console.log("Resumed");
      interval = setInterval(() => {
        setTotalWorkSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else {
      // setTotalWorkSeconds(0);
      // setTotalFreeSeconds(0);
    }

    return () => clearInterval(interval);
  }, [currentStatus]);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleBUttonClick = (id) => {
    setCurrentStatus(
      currentStatus === "Paused"
        ? "Resumed"
        : currentStatus === "Resumed"
        ? "Paused"
        : "Resumed"
    );
    dispatch(TicketInteract(id, navigate));
  };

  const handleBUttonCompleteClick = (id) => {
    dispatch(CompleteInteract(id, navigate));
    setIsViewOnly(true);
  };
  return (
    <CardWrapper sx={{ margin: 1 }} key={key}>
      {}
      <CardContent sx={{ padding: 1 }}>
        <Box sx={{}}>
          <Grid container direction="row">
            <Box sx={{ display: "flex", zIndex: 999, width: "100%" }}>
              {/* <CardActionArea onClick={()=>{alert("a")}}> */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  flex: 1,
                  // bgcolor: "red",
                }}
              >
                <div>
                  <Typography
                    color="black"
                    sx={{
                      fontSize: 16,
                      fontWeight: "bold",
                      fontFamily: "sans-serif",
                      //  backgroundColor:'red'
                    }}
                  >
                    {ticketData.incidentSubject}
                  </Typography>
                </div>
                <div style={{ display: "flex" }}>
                  <Typography
                    color="black"
                    sx={{
                      fontSize: 10,
                      fontWeight: 600,
                      fontFamily: "sans-serif",
                      color: "#FF735C",
                      //  backgroundColor:'red'
                    }}
                  >
                    {ticketData.person.displayName}
                  </Typography>
                  <Typography
                    color="black"
                    sx={{
                      fontSize: 10,
                      fontWeight: 600,
                      marginLeft: 2,
                      fontFamily: "sans-serif",
                      color: "#FF735C",
                    }}
                  >
                    {ticketData.person.email}
                  </Typography>
                </div>
                <div
                  style={{
                    display: "flex",
                    marginTop: 10,
                    //backgroundColor: "green",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <Typography
                    color="black"
                    sx={{
                      fontSize: 12,
                      fontWeight: 600,
                      fontFamily: "sans-serif",
                      wordWrap: "break-word", // or overflowWrap: "break-word"
                    }}
                  >
                    Ticket Id: {ticketData.primaryIdentifier}
                  </Typography>
                  <Typography
                    color="black"
                    sx={{
                      fontSize: 12,
                      fontWeight: 300,
                      fontFamily: "sans-serif",
                      wordWrap: "break-word", // or overflowWrap: "break-word"
                    }}
                  >
                    Scheduled: {ticketData.whenUpdatedString}
                  </Typography>
                </div>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flex: 0.3,
                  alignItems: "flex-end",
                  justifyContent: "center",
                }}
              >
                {onlyvisibity ? (
                  <>
                    {viewOnly ? (
                      <img
                        src={logo}
                        alt="Centered Image"
                        style={{ width: 75 }}
                      />
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <>
                    {viewOnly ? (
                      <img
                        src={logo}
                        alt="Centered Image"
                        style={{ width: 75 }}
                      />
                    ) : (
                      <IconButton
                        id="start_button"
                        onClick={() => {
                          handleBUttonClick(ticketData.primaryIdentifier);
                        }}
                      >
                        {currentStatus === "Resumed" ? (
                          <PauseCircleIcon
                            sx={{
                              color: "#FF735C",
                              fontSize: 50,
                            }}
                          />
                        ) : (
                          <PlayCircleFilledIcon
                            sx={{
                              color: "#FF735C",
                              fontSize: 50,
                            }}
                          />
                        )}
                      </IconButton>
                    )}
                  </>
                )}
              </Box>
            </Box>
          </Grid>
        </Box>
      </CardContent>
      <CardActions disableSpacing sx={{ padding: 0 }}>
        <Box sx={{ width: "100%", padding: 1 }}>
          <LinearProgress
            sx={{
              backgroundColor: "#ffc7be",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#FF735C",
                //transition: "none"
              },
              height: 5,
              borderRadius: 5,
            }}
            // variant={isTimerRunning === true ? "indeterminate" : "determinate"}
            variant={
              currentStatus === "Resumed" ? "indeterminate" : "determinate"
            }
            value={"0"}
          />
        </Box>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto">
        <CardContent>
          <Typography paragraph>{ticketData.ticketDescription}</Typography>

          <Box
            // component="form"
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              // justifyContent:'space-between',
              "& .MuiTextField-root": {},
              marginBottom: 2,
            }}
            noValidate
            autoComplete="off"
          >
            <div style={{ display: "flex", width: "100%" }}>
              <TextField
                id="outlined-multiline-flexible"
                label="Description"
                multiline
                maxRows={4}
                sx={{ width: "100%" }}
              />
            </div>

            <Box
              sx={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
              }}
            >
              {onlyvisibity ? (
                <></>
              ) : (
                <>
                  {viewOnly ? (
                    <></>
                  ) : (
                    <IconButton
                      id="start_button"
                      onClick={() => {
                        handleBUttonCompleteClick(ticketData.primaryIdentifier);
                      }}
                    >
                      <CheckCircleIcon
                        sx={{
                          color: "#FF735C",
                          fontSize: 50,
                        }}
                      />
                    </IconButton>
                  )}
                </>
              )}
            </Box>
          </Box>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography paragraph>Spend time:</Typography>
              <Paper
                // variant="outlined"
                square
                elevation={3}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 20,
                  width: "80%",
                  padding: 2,
                  borderRadius: 1,
                  backgroundColor: "#0d6efd",
                  color: "#fff",
                }}
              >
                <Typography sx={{ m: 0 }} paragraph>
                  {formatTime(totalWorkSeconds)}
                </Typography>
              </Paper>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography paragraph>Paused time:</Typography>
              <Paper
                // variant="outlined"
                square
                elevation={3}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 20,
                  width: "80%",
                  padding: 2,
                  borderRadius: 1,
                  backgroundColor: "#F6F696",
                  color: "#C5AC2F",
                }}
              >
                <Typography sx={{ m: 0 }} paragraph>
                  {formatTime(totalFreeSeconds)}
                </Typography>
              </Paper>
            </div>
          </div>
        </CardContent>
      </Collapse>
    </CardWrapper>
  );
}
