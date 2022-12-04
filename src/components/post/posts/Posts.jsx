import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import PostAuthor from "./PostAuthor";
import { TransitionGroup } from 'react-transition-group';
import ReactToPost from "./ReactToPost";
import Comment from "./Comment";
import PostMedia from "./PostMedia";
import PostOptionBtn from "./PostOptionsBtn";
import { Paper, Typography, Stack, Collapse, Box } from "@mui/material";
import Tags from "./Tags";

const Posts = ({ posts }) => {

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <TransitionGroup>
          {posts.map((post) => (
            <Collapse key={post.id}>
              <Paper elevation={2} component="article"
                sx={{
                  width: "100%",
                  pt: 2,
                  my: 2
                }}
              >
                <Stack width="100%" pb={1} px={2} direction="row" alignItems="center" justifyContent="space-between">
                  {/* Post author */}
                  <PostAuthor author={post.author} created={post.created} />
                  {/* Post options */}
                  {/* I need the posts state to the delete option */}
                  <PostOptionBtn post={post} />
                </Stack>
                <Link style={{ color: "inherit", textDecoration: "none" }} to={`/post/${post.id}`}>
                  <Stack spacing={1} width="100%" px={2}>
                    <Stack spacing={1}>
                      {/* post title */}
                      <Box sx={{ maxWidth: "100%", overflowWrap: "break-word" }}>
                        <Typography variant="h5" component="h2">
                          {post.title}
                        </Typography>
                      </Box>
                      {/* post body */}
                      <Box sx={{ maxWidth: "100%", overflowWrap: "break-word" }}>
                        <Typography variant="body1">
                          {post.body}
                        </Typography>
                      </Box>
                    </Stack>
                    <Tags tags={post.tags} />
                    {/* post media */}
                    <PostMedia media={post.media} />
                  </Stack>
                </Link>
                <ReactToPost postId={post.id} reactions={post.reactions} />
                <Comment postId={post.id} />
              </Paper>
            </Collapse>
          ))}
        </TransitionGroup>
      </Box>
    </>
  );
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
}

export default Posts;