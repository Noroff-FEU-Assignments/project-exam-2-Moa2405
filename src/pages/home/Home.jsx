import { Box, Divider, Hidden, Typography } from "@mui/material";
import PropTypes from "prop-types";
import PostsByFollowing from "../../components/post/posts/PostsByFollowing";
import PostFeed from "../../components/post/posts/PostFeed";
import { Stack } from "@mui/system";
import PeopleToFollow from "../../components/peopleToFollow/PeopleToFollow";

const Home = () => {

  return (
    <>
      <Stack spacing={4} >
        <Box sx={{ px: { xxs: "17px", xs: "0px" } }}>
          <Typography component="h1" variant="h4">
            Home
          </Typography>
        </Box>
        <Hidden mdUp>
          <PeopleToFollow />
        </Hidden>
        <Stack>
          <PostsByFollowing />
        </Stack>
        <Divider />
        <Stack>
          <PostFeed />
        </Stack>
      </Stack>
    </>
  );
}

Home.propTypes = {
  posts: PropTypes.array,
  setPosts: PropTypes.func,
  data: PropTypes.array,
  isError: PropTypes.bool,
  isLoading: PropTypes.bool
};

export default Home;