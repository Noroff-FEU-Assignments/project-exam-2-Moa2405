import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useThemeMode } from "../../context/themeContext"
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import CreatePost from "../post/createPost/CreatePost";
import SettingsIcon from '@mui/icons-material/Settings';
import { NavLink } from 'react-router-dom';
import { useTheme } from "@mui/system";
import LogoutIcon from '@mui/icons-material/Logout';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Brightness2Icon from '@mui/icons-material/Brightness2';
import SearchBar from "../searchBar/SearchBar";
import PropTypes from "prop-types";
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Paper, Stack } from '@mui/material';

const NavbarStickyBottom = () => {

  const theme = useTheme();
  const { handleMode } = useThemeMode();
  const { logout } = useAuth();
  const handleLogout = () => logout();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleTheme = () => {
    handleMode();
    handleClose();
  }

  return (
    <Paper sx={{ display: { xs: "none" }, position: "fixed", bottom: "0", width: "100%", zIndex: "1000", pt: "5px", pb: "14px", px: "14px", }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        {/* navigate home */}
        <NavLink to="/" style={{ textDecoration: "none", color: "inherit", backgroundColor: "inherit" }}>
          <IconButton>
            <HomeIcon color="action" />
          </IconButton>
        </NavLink>
        {/* navigate profile */}
        <NavLink to="/user/myProfilePage" style={{ textDecoration: "none", color: "inherit", backgroundColor: "inherit" }}>
          <IconButton>
            <PersonIcon color="action" />
          </IconButton>
        </NavLink>
        {/* navigate create post */}
        <CreatePost createPost={true} />
        {/* navigate search */}
        <SearchBar />
        {/* navigate settings */}
        <div>
          <IconButton
            size="small"
            aria-label="setting"
            aria-controls="appbar-settings"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
            p="0px"
          >
            <SettingsIcon color="action" />
          </IconButton>
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
              <MenuItem onClick={handleTheme}>
                <ListItemIcon sx={{ md: { pl: 4 }, borderRadius: "0.25rem" }}>
                  <WbSunnyIcon />
                </ListItemIcon>
                <ListItemText primary="Light mode" />
              </MenuItem>
            ) : (
              <MenuItem onClick={handleTheme}>
                <ListItemIcon sx={{ md: { pl: 4 }, borderRadius: "0.25rem" }}>
                  <Brightness2Icon />
                </ListItemIcon>
                <ListItemText primary="Dark mode" />
              </MenuItem>
            )}
            <MenuItem onClick={handleLogout}>
              <ListItemIcon sx={{ md: { pl: 4 }, borderRadius: "0.25rem" }}>
                <LogoutIcon />
              </ListItemIcon>
              Sign out
            </MenuItem>
          </Menu>
        </div>
      </Stack>
    </Paper>
  );
}

NavbarStickyBottom.propTypes = {
  createPost: PropTypes.bool,
}

export default NavbarStickyBottom;