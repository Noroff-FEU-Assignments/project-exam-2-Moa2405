import PropTypes from "prop-types";
import url from "../../../common/url";
import useAxios from "../../../hooks/useAxios"
import ErrorAlert from "../../alert/ErrorAlert";
import InfiniteScroll from "react-infinite-scroller";
import Posts from "./Posts";
import { useInfiniteQuery } from "react-query";
import PostSkeleton from "./PostsSkeletons";
import { Box, Typography } from "@mui/material";

const PostFeed = () => {

  const apiUrl = url.posts.postsInfiniteScroll;
  const axios = useAxios();

  const fetchPosts = async ({ pageParam = 0 }) => {
    const results = await axios.get(apiUrl + pageParam);
    return { results, nextPage: pageParam + 20, totalPages: 100 };
  }

  const { data, isLoading, isError, hasNextPage, fetchNextPage } = useInfiniteQuery("posts", fetchPosts, {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.nextPage < lastPage.totalPages) return lastPage.nextPage;
      return undefined;
    },
  });

  if (isLoading) {
    return <PostSkeleton />
  }

  if (isError) {
    return <ErrorAlert />
  }

  return (
    <>
      <Box sx={{ px: { xxs: "17px", xs: "0px" } }}>
        <Typography color="textSecondary" component="h2" variant="h6">
          Posts feed
        </Typography>
      </Box>
      <InfiniteScroll hasMore={hasNextPage} loadMore={fetchNextPage}>
        {data.pages.map((page, index) =>
          <Posts key={index} posts={page.results.data} />
        )}
      </InfiniteScroll>
    </>
  );
}

PostFeed.propTypes = {
  posts: PropTypes.array,
  setPosts: PropTypes.func,
  data: PropTypes.array,
  isError: PropTypes.bool,
  isLoading: PropTypes.bool
};


export default PostFeed

