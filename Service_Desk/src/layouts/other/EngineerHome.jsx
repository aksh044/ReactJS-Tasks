import React, { useEffect } from "react";
import ResponsiveAppBar from "../../components/AppBar/ResponsiveAppBar";
import { Grid, Skeleton, Stack, Typography } from "@mui/material";
import EngineeringCard from "../../components/Cards/EngineeringCard";
import { GetMyTickets } from "../../action/Ticket";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function EngineerHome() {
  const { ticketData, loading } = useSelector((state) => state.ticket);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(GetMyTickets("", navigate));
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
  }, []);

  return (
    <Grid
      container
      spacing={2}
      sx={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid item xs={12}>
        <ResponsiveAppBar></ResponsiveAppBar>
      </Grid>

      <Grid item xs={12}>
        <Grid sx={{ margin: 1 }}>
          <div style={{ padding: 1, marginLeft: 8 }}>
            <Typography variant="h7" color="#646464" fontWeight={500}>
              Available Tikects
            </Typography>
          </div>

          {loading ? (
            <Stack spacing={1}>
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              <Skeleton variant="rectangular" width={"100%"} height={60} />
              <Skeleton variant="rounded" width={"100%"} height={60} />
            </Stack>
          ) : (
            <Grid item lg={12} md={12} sm={12} xs={12}>
              {ticketData.length > 0 ? (
                <>
                  {ticketData.map((item, index) => (
                    <EngineeringCard
                      key={index}
                      ticketData={item}
                      onlyvisibity={false}
                    ></EngineeringCard>
                  ))}
                </>
              ) : (
                <div style={{ padding: 1, marginTop: "10%" }}>
                  <Typography
                    variant="h5"
                    color="#646464"
                    fontWeight={500}
                    textAlign={"center"}
                  >
                    Currently you don't have any pending tickets.
                  </Typography>
                </div>
              )}
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default EngineerHome;
