import React from "react";
import { Box, Stack } from "@mui/material";
import SearchBar from "../../../searchBar/SearchBar";
import PeopleYouFollow from "../../../peopleYouFollow/PeopleYouFollow";
import PeopleToFollow from "../../../peopleToFollow/PeopleToFollow";

const RightSidebar = () => {
  return (
    <Box sx={{
      position: "fixed",
      width: { md: "232px", lg: "286px" },
      top: "2rem",
      display: { xxs: "none", md: "block" }
    }}
    >
      <Stack spacing={1}>
        <SearchBar />
        <PeopleYouFollow />
        <PeopleToFollow />
      </Stack>
    </Box>
  );
}

export default RightSidebar;