import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTheme } from "@mui/system";
import { useAuth } from "../../context/authContext";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import CreatePost from "../post/createPost/CreatePost";
import { useThemeMode } from "../../context/themeContext"
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Brightness2Icon from '@mui/icons-material/Brightness2';
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Hidden,
  Menu,
  MenuItem,
  ListItem
} from "@mui/material";

const LeftSidebar = () => {

  const { handleMode } = useThemeMode();
  const theme = useTheme();
  const { logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handelTheme = () => {
    handleMode();
    handleClose();
  }

  const inactiveNavLink = {
    color: theme.palette.text.disabled,
    textDecoration: "none",
  };
  const activeNavLink = {
    color: theme.palette.text.primary,
    textDecoration: "none",
  };

  return (
    <Box sx={{ height: "100vh", width: "100%" }}>
      <Box textAlign="center"
        sx={{
          position: "fixed",
          top: "2rem",
        }}
      >
        <nav aria-label="main navigation">
          <List sx={{ pl: "17px", pt: "0px", maxWidth: "100%" }}>
            <Link to="/home" style={{ textDecoration: "none", color: "inherit", backgroundColor: "inherit" }}>
              <ListItemIcon>
                {theme.palette.mode === "dark" ? <img src="/logo.svg" alt="Logo" width="40px" /> : <img src="/logo-black.svg" alt="Logo" width="40px" />}
              </ListItemIcon>
            </Link>
            {/* navigate home */}
            <NavLink to="/home" style={({ isActive }) => isActive ? activeNavLink : inactiveNavLink}>
              <ListItemButton sx={{ borderRadius: "0.25rem", margin: ".5rem 0" }}>
                <ListItemIcon>
                  <HomeIcon fontSize="large" />
                </ListItemIcon>
                <Hidden mdDown>
                  <ListItemText primary="Home" primaryTypographyProps={{ fontSize: "21px" }} />
                </Hidden>
              </ListItemButton>
            </NavLink>
            {/* navigate profile */}
            <NavLink to="/user/myProfilePage" style={({ isActive }) => isActive ? activeNavLink : inactiveNavLink}>
              <ListItemButton sx={{ borderRadius: "0.25rem", margin: ".5rem 0" }}>
                <ListItemIcon>
                  <PersonIcon fontSize="large" />
                </ListItemIcon>
                <Hidden mdDown>
                  <ListItemText primary="Profile" primaryTypographyProps={{ fontSize: "21px" }} />
                </Hidden>
              </ListItemButton>
            </NavLink>
            {/* settings */}
            <div>
              <ListItemButton sx={{ borderRadius: "0.25rem", margin: ".5rem 0" }}
                aria-label="setting"
                aria-controls="appbar-settings"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                p="0px"
              >
                <ListItemIcon>
                  <SettingsIcon fontSize="large" />
                </ListItemIcon>
                <Hidden mdDown>
                  <ListItemText primary="Settings" primaryTypographyProps={{ fontSize: "21px" }} />
                </Hidden>
              </ListItemButton>
              <Menu
                id="appbar-settings"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {theme.palette.mode === "dark" ? (
                  <MenuItem onClick={handelTheme}>
                    <ListItemIcon sx={{ backgroundColor: "transparent", borderRadius: "0.25rem" }}>
                      <WbSunnyIcon />
                    </ListItemIcon>
                    <ListItemText primary="Light mode" />
                  </MenuItem>
                ) : (
                  <MenuItem onClick={handelTheme}>
                    <ListItemIcon sx={{ backgroundColor: "transparent", borderRadius: "0.25rem" }}>
                      <Brightness2Icon />
                    </ListItemIcon>
                    <ListItemText primary="Dark mode" />
                  </MenuItem>
                )}
                <MenuItem onClick={logout}>
                  <ListItemIcon sx={{ backgroundColor: "transparent", borderRadius: "0.25rem" }}>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primaryTypographyProps={{ fontSize: "18px", color: theme.palette.action.active }} primary="Sign out" />
                </MenuItem>
              </Menu>
            </div>
            <ListItem sx={{ md: { pl: 4 }, borderRadius: "0.25rem" }}>
              <CreatePost />
            </ListItem>
          </List>
        </nav>
      </Box>
    </Box >
  );
}

export default LeftSidebar;