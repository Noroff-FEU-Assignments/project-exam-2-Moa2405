import Posts from "../post/posts/Posts";
import useAxios from "../../hooks/useAxios";
import { useQuery } from 'react-query';
import url from "../../common/url";
import PostSkeleton from "../post/posts/PostsSkeletons";
import ErrorAlert from "../alert/ErrorAlert";
import { Box, Typography } from "@mui/material";

const UsersProfilePosts = ({ name }) => {

  const axios = useAxios();

  const fetchPosts = async () => {
    const { data } = await axios.get(url.posts.postsByAuthor(name));
    return data;
  }

  const { data, isError, isLoading } = useQuery(["postsFeed", { name }], fetchPosts);

  if (isLoading) {
    return <PostSkeleton />
  }

  if (isError) {
    return <ErrorAlert />
  }

  if (data.length === 0) {
    return (
      <Box sx={{ px: 2 }}>
        <Typography>This user has no posts yet</Typography>
      </Box>
    )
  }

  return (
    <>
      <Posts posts={data} />
    </>
  );
}

export default UsersProfilePosts;