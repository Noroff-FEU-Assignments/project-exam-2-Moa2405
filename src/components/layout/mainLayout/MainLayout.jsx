import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useTheme } from "@mui/system";
import { useAuth } from "../../../context/authContext";
import { Box, Grid } from "@mui/material";
import LeftSidebar from "../../navigation/LeftSidebar";
import RightSidebar from "./rightSideBar/RightSidebar";
import NavbarStickyBottom from "../../navigation/NavbarStickyBottom"

const Layout = () => {

  const theme = useTheme();
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/signIn" />;
  }

  return (
    <>
      <Box
        sx={{
          widows: "100%",
          minHeight: "100vh",
          maxWidth: theme.breakpoints.values.lg,
          margin: "2rem auto",
          // padding: "0 17px",
          position: "relative",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={2} md={3} sx={{ display: { xxs: "none", xs: "block" } }}>
            <LeftSidebar />
          </Grid>
          <Grid item xxs={12} xs={10} sm={8} md={6}>
            {/* main content */}
            <Box sx={{ px: { xxs: "0", xs: "17px" } }} component="main">
              <Outlet />
            </Box>
          </Grid>
          <Grid item md={3}>
            <RightSidebar />
          </Grid>
        </Grid>
      </Box>
      <NavbarStickyBottom />
    </>
  );
}

export default Layout;