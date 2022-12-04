import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "react-query";
import url from "../../common/url";
import ErrorAlert from "../../components/alert/ErrorAlert";
import PostAuthor from "../../components/post/singlePost/PostAuthor";
import PostMedia from "../../components/post/posts/PostMedia";
import ReactToPost from "../../components/post/posts/ReactToPost";
import PostSkeleton from "../../components/post/singlePost/PostSkeleton";
import CommentOnPost from "../../components/post/singlePost/CommentOnPost";
import Comments from "../../components/post/singlePost/Comments";
import { Typography, Stack, Hidden } from "@mui/material";
import Tags from "../../components/post/posts/Tags";

const SinglePost = () => {

  const axios = useAxios();
  const { id } = useParams();

  const fetchPost = async () => {
    const { data } = await axios.get(url.posts.getPost(id));
    return data;
  }

  const { data, isError, isLoading } = useQuery("singlePost", fetchPost)

  if (isLoading) {
    return <PostSkeleton />
  }

  if (isError) {
    return <ErrorAlert />
  }

  return (
    <>
      <Stack spacing={1} width="100%">
        <Stack width="100%" px={2} component="article" spacing={1}>
          <PostAuthor author={data.author} created={data.created} />
          <Hidden xsDown>
            <Typography variant="h4" component="h1">{data.title}</Typography>
          </Hidden>
          <Hidden xsUp>
            <Typography variant="h5" component="h1">{data.title}</Typography>
          </Hidden>
          <Typography variant="body1">{data.body}</Typography>
          <Tags tags={data.tags} />
        </Stack>
        <PostMedia media={data.media} />
        <Stack width="100%" spacing={1}>
          <ReactToPost postId={data.id} reactions={data.reactions} />
          <CommentOnPost postId={data.id} />
          <Comments />
        </Stack>
      </Stack>
    </>
  );
}

export default SinglePost;