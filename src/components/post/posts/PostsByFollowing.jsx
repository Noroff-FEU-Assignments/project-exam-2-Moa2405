import PropTypes from "prop-types";
import url from "../../../common/url";
import useAxios from "../../../hooks/useAxios"
import { useQuery } from 'react-query';
import PostSkeleton from "./PostsSkeletons";
import ErrorAlert from "../../alert/ErrorAlert";
import Posts from "./Posts";
import { Box, Typography } from "@mui/material";

const PostsByFollowing = () => {

  const axios = useAxios();
  const fetchPostsByFollowing = async () => {
    const { data } = await axios.get(url.posts.getPostsByFollowing);
    return data;
  }

  const { data, isError, isLoading } = useQuery("PostsByFollowing", fetchPostsByFollowing);

  if (isLoading) {
    return <PostSkeleton />
  }

  if (isError) {
    return <ErrorAlert />
  }

  if (!isLoading && !isError && data.length === 0) {
    return (
      <Box sx={{ px: { xxs: "17px", xs: "0px" } }}>
        <Typography>Start fallowing interesting people</Typography>
      </Box>
    )
  }

  return (
    <>
      <Box sx={{ px: { xxs: "17px", xs: "0px" } }}>
        <Typography color="textSecondary" component="h2" variant="body1">
          Posts by those you follow
        </Typography>
      </Box>
      <Posts posts={data} />
    </>
  );
}

PostsByFollowing.propTypes = {
  posts: PropTypes.array,
  setPosts: PropTypes.func,
  data: PropTypes.array,
  isError: PropTypes.bool,
  isLoading: PropTypes.bool
}

export default PostsByFollowing;